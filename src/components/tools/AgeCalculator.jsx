import React, { useState, useEffect } from 'react'
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [results, setResults] = useState(null)
  const [liveAge, setLiveAge] = useState(null)

  useEffect(() => {
    calculateAge()
  }, [birthDate, targetDate])

  useEffect(() => {
    let interval
    if (birthDate && targetDate === format(new Date(), 'yyyy-MM-dd')) {
      // Update live age every second for today's date
      interval = setInterval(() => {
        calculateLiveAge()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [birthDate, targetDate])

  const calculateAge = () => {
    if (!birthDate) {
      setResults(null)
      return
    }

    const birth = new Date(birthDate)
    const target = new Date(targetDate)

    if (birth > target) {
      setResults(null)
      return
    }

    const years = differenceInYears(target, birth)
    const months = differenceInMonths(target, birth) % 12
    const days = differenceInDays(target, birth) - (years * 365 + months * 30)
    
    const totalDays = differenceInDays(target, birth)
    const totalMonths = differenceInMonths(target, birth)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = differenceInHours(target, birth)
    const totalMinutes = differenceInMinutes(target, birth)

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1)
    }
    const daysToNextBirthday = differenceInDays(nextBirthday, target)

    // Calculate zodiac sign
    const month = birth.getMonth() + 1
    const day = birth.getDate()
    const zodiacSign = getZodiacSign(month, day)

    // Calculate Chinese zodiac
    const chineseZodiac = getChineseZodiac(birth.getFullYear())

    setResults({
      years,
      months,
      days: Math.abs(days),
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysToNextBirthday,
      nextBirthday,
      zodiacSign,
      chineseZodiac,
      birthDate: birth,
      targetDate: target
    })
  }

  const calculateLiveAge = () => {
    if (!birthDate) {
      setLiveAge(null)
      return
    }

    const birth = new Date(birthDate)
    const now = new Date()

    if (birth > now) {
      setLiveAge(null)
      return
    }

    const seconds = differenceInSeconds(now, birth)
    const minutes = differenceInMinutes(now, birth)
    const hours = differenceInHours(now, birth)
    const days = differenceInDays(now, birth)

    setLiveAge({
      seconds,
      minutes,
      hours,
      days
    })
  }

  const getZodiacSign = (month, day) => {
    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ]

    for (const sign of signs) {
      if (sign.name === 'Capricorn') {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
          return sign.name
        }
      } else {
        const [startMonth, startDay] = sign.start
        const [endMonth, endDay] = sign.end
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
          return sign.name
        }
      }
    }
    return 'Unknown'
  }

  const getChineseZodiac = (year) => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
    const startYear = 1900 // Year of the Rat
    return animals[(year - startYear) % 12]
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleReset = () => {
    setBirthDate('')
    setTargetDate(format(new Date(), 'yyyy-MM-dd'))
    setResults(null)
    setLiveAge(null)
  }

  const copyResults = () => {
    if (!results) return

    const text = `
Age Calculation Results:
Birth Date: ${format(results.birthDate, 'MMMM dd, yyyy')}
${targetDate === format(new Date(), 'yyyy-MM-dd') ? 'Current Age' : 'Age on ' + format(results.targetDate, 'MMMM dd, yyyy')}:

Exact Age: ${results.years} years, ${results.months} months, ${results.days} days

Total Time Lived:
- ${formatNumber(results.totalDays)} days
- ${formatNumber(results.totalWeeks)} weeks
- ${formatNumber(results.totalMonths)} months
- ${formatNumber(results.totalHours)} hours
- ${formatNumber(results.totalMinutes)} minutes

Next Birthday: ${format(results.nextBirthday, 'MMMM dd, yyyy')} (in ${results.daysToNextBirthday} days)
Zodiac Sign: ${results.zodiacSign}
Chinese Zodiac: ${results.chineseZodiac}
    `.trim()

    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Calculator</h2>
        <p className="text-gray-600">Calculate your exact age and interesting statistics</p>
      </div>

      {/* Input Form */}
      <Card className="p-6" elevated>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Birth Date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={format(new Date(), 'yyyy-MM-dd')}
            icon="Calendar"
            required
          />
          <Input
            label="Calculate Age On"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            min={birthDate}
            icon="Clock"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTargetDate(format(new Date(), 'yyyy-MM-dd'))}
            icon="Calendar"
          >
            Use Today's Date
          </Button>
        </div>
      </Card>

      {/* Live Age Counter */}
      {liveAge && targetDate === format(new Date(), 'yyyy-MM-dd') && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200" elevated>
          <h3 className="text-lg font-semibold mb-4 text-center text-purple-800">
            You Have Been Alive For...
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-purple-600">{formatNumber(liveAge.days)}</p>
              <p className="text-sm text-gray-600">Days</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-purple-600">{formatNumber(liveAge.hours)}</p>
              <p className="text-sm text-gray-600">Hours</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-purple-600">{formatNumber(liveAge.minutes)}</p>
              <p className="text-sm text-gray-600">Minutes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-purple-600">{formatNumber(liveAge.seconds)}</p>
              <p className="text-sm text-gray-600">Seconds</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {results && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200" elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Age Calculation Results</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              icon="Copy"
            >
              Copy
            </Button>
          </div>

          {/* Exact Age */}
          <div className="text-center mb-8 p-6 bg-white rounded-xl shadow-sm">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              {targetDate === format(new Date(), 'yyyy-MM-dd') ? 'Your Current Age' : 'Age on Target Date'}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-blue-600">{results.years}</p>
                <p className="text-sm text-gray-600">Years</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{results.months}</p>
                <p className="text-sm text-gray-600">Months</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{results.days}</p>
                <p className="text-sm text-gray-600">Days</p>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="Calendar" size={24} className="text-green-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatNumber(results.totalDays)}</p>
              <p className="text-sm text-gray-600">Total Days</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="Clock" size={24} className="text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatNumber(results.totalWeeks)}</p>
              <p className="text-sm text-gray-600">Total Weeks</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="CalendarDays" size={24} className="text-purple-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatNumber(results.totalMonths)}</p>
              <p className="text-sm text-gray-600">Total Months</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="Timer" size={24} className="text-orange-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatNumber(results.totalHours)}</p>
              <p className="text-sm text-gray-600">Total Hours</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="Clock3" size={24} className="text-red-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatNumber(results.totalMinutes)}</p>
              <p className="text-sm text-gray-600">Total Minutes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ApperIcon name="Gift" size={24} className="text-pink-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{results.daysToNextBirthday}</p>
              <p className="text-sm text-gray-600">Days to Birthday</p>
            </div>
          </div>

          {/* Birth Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-3">Birth Information</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Birth Date:</span>
                  <span className="font-medium">{format(results.birthDate, 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Day of Week:</span>
                  <span className="font-medium">{format(results.birthDate, 'EEEE')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zodiac Sign:</span>
                  <span className="font-medium">{results.zodiacSign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chinese Zodiac:</span>
                  <span className="font-medium">{results.chineseZodiac}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-3">Upcoming Birthday</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Birthday:</span>
                  <span className="font-medium">{format(results.nextBirthday, 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Remaining:</span>
                  <span className="font-medium text-pink-600">{results.daysToNextBirthday} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Will Turn:</span>
                  <span className="font-medium">{results.years + 1} years old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Day of Week:</span>
                  <span className="font-medium">{format(results.nextBirthday, 'EEEE')}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Fun Facts */}
      {results && (
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" elevated>
          <h4 className="text-lg font-semibold mb-4 text-orange-900">Fun Age Facts</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>🫀 Your heart has beaten approximately <strong>{formatNumber(Math.floor(results.totalMinutes * 70))}</strong> times</p>
              <p>👁️ You have blinked about <strong>{formatNumber(Math.floor(results.totalMinutes * 15))}</strong> times</p>
              <p>🌍 Earth has traveled <strong>{formatNumber(Math.floor(results.totalDays * 1.6))}</strong> million miles around the sun</p>
            </div>
            <div className="space-y-2">
              <p>💇 Your hair has grown approximately <strong>{Math.floor(results.totalDays * 0.017)}</strong> inches</p>
              <p>💅 You've grown about <strong>{Math.floor(results.totalDays * 0.1)}</strong> new fingernails</p>
              <p>🌙 You've experienced <strong>{Math.floor(results.totalDays / 29.5)}</strong> full moon cycles</p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleReset}
          icon="RotateCcw"
        >
          Reset Calculator
        </Button>
      </div>
    </div>
  )
}

export default AgeCalculator