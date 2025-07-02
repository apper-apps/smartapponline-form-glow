import React, { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('1000000')
  const [interestRate, setInterestRate] = useState('10.5')
  const [tenure, setTenure] = useState('20')
  const [tenureType, setTenureType] = useState('years') // years or months
  const [results, setResults] = useState(null)

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure, tenureType])

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) {
      setResults(null)
      return
    }

    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate)
    const tenureValue = parseFloat(tenure)

    if (principal <= 0 || annualRate < 0 || tenureValue <= 0) {
      setResults(null)
      return
    }

    // Convert to monthly values
    const monthlyRate = annualRate / 12 / 100
    const months = tenureType === 'years' ? tenureValue * 12 : tenureValue

    let emi = 0
    if (monthlyRate > 0) {
      // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months)
      const emiDenominator = Math.pow(1 + monthlyRate, months) - 1
      emi = emiNumerator / emiDenominator
    } else {
      // If interest rate is 0, simple division
      emi = principal / months
    }

    const totalAmount = emi * months
    const totalInterest = totalAmount - principal

    // Generate amortization schedule (first 12 months)
    const schedule = []
    let remainingPrincipal = principal

    for (let i = 1; i <= Math.min(12, months); i++) {
      const interestPayment = remainingPrincipal * monthlyRate
      const principalPayment = emi - interestPayment
      remainingPrincipal -= principalPayment

      schedule.push({
        month: i,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingPrincipal)
      })
    }

    setResults({
      emi,
      totalAmount,
      totalInterest,
      principal,
      months,
      schedule,
      monthlyRate: monthlyRate * 100,
      annualRate
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const handleReset = () => {
    setLoanAmount('1000000')
    setInterestRate('10.5')
    setTenure('20')
    setTenureType('years')
    setResults(null)
  }

  const copyResults = () => {
    if (!results) return

    const text = `
EMI Calculation Results:
Loan Amount: ${formatCurrency(results.principal)}
Interest Rate: ${results.annualRate}% per annum
Tenure: ${tenure} ${tenureType}

Monthly EMI: ${formatCurrency(results.emi)}
Total Amount Payable: ${formatCurrency(results.totalAmount)}
Total Interest: ${formatCurrency(results.totalInterest)}
    `.trim()

    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">EMI Calculator</h2>
        <p className="text-gray-600">Calculate Equated Monthly Installments for loans</p>
      </div>

      {/* Input Form */}
      <Card className="p-6" elevated>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Amount */}
          <div className="md:col-span-2">
            <Input
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              icon="IndianRupee"
              min="1000"
              step="1000"
            />
            {loanAmount && (
              <div className="mt-2 text-sm text-gray-600">
                Amount: {formatCurrency(parseFloat(loanAmount))}
              </div>
            )}
          </div>

          {/* Interest Rate */}
          <Input
            label="Annual Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 10.5"
            icon="Percent"
            min="0"
            max="30"
            step="0.1"
          />

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure"
                min="1"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Loan Amount Buttons */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Selection</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[500000, 1000000, 2500000, 5000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setLoanAmount(amount.toString())}
                className={`p-2 text-sm rounded-lg border transition-all ${
                  loanAmount === amount.toString()
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200" elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">EMI Calculation Results</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              icon="Copy"
            >
              Copy
            </Button>
          </div>

          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <ApperIcon name="Calculator" size={32} className="text-indigo-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(results.emi)}
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <ApperIcon name="TrendingUp" size={32} className="text-green-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(results.totalAmount)}
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <ApperIcon name="DollarSign" size={32} className="text-orange-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Total Interest</p>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Principal</p>
              <p className="font-semibold">{formatCurrency(results.principal)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-semibold">{results.annualRate}% p.a.</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Tenure</p>
              <p className="font-semibold">{results.months} months</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Interest %</p>
              <p className="font-semibold">
                {((results.totalInterest / results.principal) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Payment Breakdown Chart */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Payment Breakdown</h4>
            <div className="flex h-8 rounded-lg overflow-hidden">
              <div 
                className="bg-indigo-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${(results.principal / results.totalAmount) * 100}%` }}
              >
                Principal
              </div>
              <div 
                className="bg-orange-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${(results.totalInterest / results.totalAmount) * 100}%` }}
              >
                Interest
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Principal: {((results.principal / results.totalAmount) * 100).toFixed(1)}%</span>
              <span>Interest: {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Amortization Schedule Preview */}
          {results.schedule && results.schedule.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Amortization Schedule (First Year)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left">Month</th>
                      <th className="p-3 text-right">EMI</th>
                      <th className="p-3 text-right">Principal</th>
                      <th className="p-3 text-right">Interest</th>
                      <th className="p-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.month}</td>
                        <td className="p-3 text-right">{formatNumber(row.emi)}</td>
                        <td className="p-3 text-right text-indigo-600">{formatNumber(row.principal)}</td>
                        <td className="p-3 text-right text-orange-600">{formatNumber(row.interest)}</td>
                        <td className="p-3 text-right">{formatNumber(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200" elevated>
        <h4 className="text-lg font-semibold mb-3 text-blue-900">EMI Calculator Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-semibold mb-2">To Reduce EMI:</h5>
            <ul className="space-y-1">
              <li>• Increase loan tenure</li>
              <li>• Make a larger down payment</li>
              <li>• Look for lower interest rates</li>
              <li>• Consider part-prepayment</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Important Factors:</h5>
            <ul className="space-y-1">
              <li>• Processing fees and charges</li>
              <li>• Prepayment penalties</li>
              <li>• Fixed vs. floating rates</li>
              <li>• Insurance requirements</li>
            </ul>
          </div>
        </div>
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

export default EMICalculator