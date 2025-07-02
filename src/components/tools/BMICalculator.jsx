import React, { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const BMICalculator = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('metric') // metric or imperial
  const [results, setResults] = useState(null)

  useEffect(() => {
    calculateBMI()
  }, [weight, height, unit])

  const calculateBMI = () => {
    if (!weight || !height) {
      setResults(null)
      return
    }

    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    if (weightNum <= 0 || heightNum <= 0) {
      setResults(null)
      return
    }

    let bmi
    let weightKg = weightNum
    let heightM = heightNum

    if (unit === 'metric') {
      // Weight in kg, height in cm
      heightM = heightNum / 100 // Convert cm to meters
      bmi = weightKg / (heightM * heightM)
    } else {
      // Weight in lbs, height in inches
      bmi = (weightNum / (heightNum * heightNum)) * 703
      weightKg = weightNum * 0.453592 // Convert to kg for ideal weight calculation
      heightM = heightNum * 0.0254 // Convert to meters
    }

    // Determine category
    let category, color, advice
    if (bmi < 18.5) {
      category = 'Underweight'
      color = 'blue'
      advice = 'Consider consulting a healthcare provider about gaining weight healthily.'
    } else if (bmi < 25) {
      category = 'Normal Weight'
      color = 'green'
      advice = 'Great! Maintain your current lifestyle with regular exercise and balanced diet.'
    } else if (bmi < 30) {
      category = 'Overweight'
      color = 'yellow'
      advice = 'Consider adopting healthier eating habits and increasing physical activity.'
    } else {
      category = 'Obese'
      color = 'red'
      advice = 'Consult with a healthcare provider for a personalized weight management plan.'
    }

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = 18.5 * (heightM * heightM)
    const idealWeightMax = 24.9 * (heightM * heightM)

    // Convert back to original units for display
    let displayIdealMin, displayIdealMax, weightUnit
    if (unit === 'imperial') {
      displayIdealMin = idealWeightMin / 0.453592 // Convert to lbs
      displayIdealMax = idealWeightMax / 0.453592
      weightUnit = 'lbs'
    } else {
      displayIdealMin = idealWeightMin
      displayIdealMax = idealWeightMax
      weightUnit = 'kg'
    }

    // Calculate weight to lose/gain to reach normal BMI
    let targetWeight = 0
    let weightDifference = 0
    let targetAction = ''

    if (bmi < 18.5) {
      targetWeight = idealWeightMin
      if (unit === 'imperial') targetWeight = targetWeight / 0.453592
      weightDifference = Math.abs(targetWeight - weightNum)
      targetAction = 'gain'
    } else if (bmi > 24.9) {
      targetWeight = idealWeightMax
      if (unit === 'imperial') targetWeight = targetWeight / 0.453592
      weightDifference = Math.abs(weightNum - targetWeight)
      targetAction = 'lose'
    }

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      advice,
      idealWeightMin: Math.round(displayIdealMin * 10) / 10,
      idealWeightMax: Math.round(displayIdealMax * 10) / 10,
      weightUnit,
      targetWeight: Math.round(targetWeight * 10) / 10,
      weightDifference: Math.round(weightDifference * 10) / 10,
      targetAction
    })
  }

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return 'from-blue-400 to-blue-600'
    if (bmi < 25) return 'from-green-400 to-green-600'
    if (bmi < 30) return 'from-yellow-400 to-yellow-600'
    return 'from-red-400 to-red-600'
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setUnit('metric')
    setResults(null)
  }

  const copyResults = () => {
    if (!results) return

    const text = `
BMI Calculation Results:
BMI: ${results.bmi}
Category: ${results.category}
${results.targetAction ? `To reach normal BMI, ${results.targetAction} ${results.weightDifference} ${results.weightUnit}` : ''}
Ideal Weight Range: ${results.idealWeightMin}-${results.idealWeightMax} ${results.weightUnit}

Health Advice: ${results.advice}
    `.trim()

    navigator.clipboard.writeText(text)
  }

  const bmiCategories = [
    { range: 'Below 18.5', category: 'Underweight', color: 'bg-blue-100 text-blue-800' },
    { range: '18.5 - 24.9', category: 'Normal Weight', color: 'bg-green-100 text-green-800' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-100 text-yellow-800' },
    { range: '30.0 and above', category: 'Obese', color: 'bg-red-100 text-red-800' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">BMI Calculator</h2>
        <p className="text-gray-600">Calculate your Body Mass Index and get health insights</p>
      </div>

      {/* Unit Toggle */}
      <Card className="p-4" elevated>
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                unit === 'metric'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                unit === 'imperial'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Imperial (lbs/in)
            </button>
          </div>
        </div>
      </Card>

      {/* Input Form */}
      <Card className="p-6" elevated>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`}
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
            icon="Scale"
            min="1"
            step="0.1"
          />
          <Input
            label={`Height (${unit === 'metric' ? 'cm' : 'inches'})`}
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
            icon="Ruler"
            min="1"
            step="0.1"
          />
        </div>

        {/* Quick Presets */}
        {unit === 'metric' && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Height Presets (cm)</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[150, 155, 160, 165, 170, 175, 180, 185, 190, 195].map((h) => (
                <button
                  key={h}
                  onClick={() => setHeight(h.toString())}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    height === h.toString()
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {h}cm
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Results */}
      {results && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200" elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">BMI Results</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              icon="Copy"
            >
              Copy
            </Button>
          </div>

          {/* BMI Score */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getBMIColor(results.bmi)} text-white mb-4`}>
              <div className="text-center">
                <div className="text-3xl font-bold">{results.bmi}</div>
                <div className="text-sm opacity-90">BMI</div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge 
                variant={
                  results.color === 'green' ? 'success' : 
                  results.color === 'yellow' ? 'warning' : 
                  results.color === 'red' ? 'error' : 'info'
                } 
                size="lg"
              >
                {results.category}
              </Badge>
              <p className="text-gray-600 max-w-md mx-auto">
                {results.advice}
              </p>
            </div>
          </div>

          {/* Weight Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-3">Ideal Weight Range</h5>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {results.idealWeightMin} - {results.idealWeightMax}
                </p>
                <p className="text-sm text-gray-600">{results.weightUnit}</p>
              </div>
            </div>

            {results.targetAction && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-3">To Reach Normal BMI</h5>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {results.targetAction} {results.weightDifference}
                  </p>
                  <p className="text-sm text-gray-600">{results.weightUnit}</p>
                </div>
              </div>
            )}
          </div>

          {/* BMI Scale */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-4">BMI Scale</h5>
            <div className="space-y-2">
              {bmiCategories.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    item.category === results.category ? 'ring-2 ring-indigo-500' : ''
                  } ${item.color}`}
                >
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-3">Health Tips</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h6 className="font-medium mb-2">🥗 Nutrition:</h6>
                <ul className="space-y-1">
                  <li>• Eat a balanced diet with plenty of fruits and vegetables</li>
                  <li>• Control portion sizes</li>
                  <li>• Stay hydrated with water</li>
                  <li>• Limit processed foods and sugary drinks</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium mb-2">🏃 Exercise:</h6>
                <ul className="space-y-1">
                  <li>• Aim for 150 minutes of moderate exercise weekly</li>
                  <li>• Include both cardio and strength training</li>
                  <li>• Take regular walks or bike rides</li>
                  <li>• Find activities you enjoy</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* BMI Information */}
      <Card className="p-6 bg-yellow-50 border-yellow-200" elevated>
        <h4 className="text-lg font-semibold mb-3 text-yellow-900">Important Note</h4>
        <p className="text-sm text-yellow-800 leading-relaxed">
          BMI is a useful screening tool but doesn't directly measure body fat or account for muscle mass, 
          bone density, overall body composition, and racial and sex differences. Athletes and people with 
          high muscle mass may have a high BMI but low body fat. Always consult with healthcare professionals 
          for personalized health advice and before making significant changes to your diet or exercise routine.
        </p>
      </Card>

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

export default BMICalculator