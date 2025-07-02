import React, { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'

const GSTCalculator = () => {
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [calculationType, setCalculationType] = useState('exclusive') // exclusive or inclusive
  const [results, setResults] = useState(null)

  const gstRates = [
    { value: '0', label: '0% (Exempted)' },
    { value: '3', label: '3% (Essential Goods)' },
    { value: '5', label: '5% (Consumer Goods)' },
    { value: '12', label: '12% (Standard Goods)' },
    { value: '18', label: '18% (Most Goods & Services)' },
    { value: '28', label: '28% (Luxury Items)' }
  ]

  useEffect(() => {
    calculateGST()
  }, [amount, gstRate, calculationType])

  const calculateGST = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setResults(null)
      return
    }

    const baseAmount = parseFloat(amount)
    const rate = parseFloat(gstRate) / 100

    let taxableAmount, gstAmount, totalAmount, cgst, sgst, igst

    if (calculationType === 'exclusive') {
      // Amount is without GST
      taxableAmount = baseAmount
      gstAmount = baseAmount * rate
      totalAmount = baseAmount + gstAmount
    } else {
      // Amount includes GST
      totalAmount = baseAmount
      taxableAmount = baseAmount / (1 + rate)
      gstAmount = totalAmount - taxableAmount
    }

    // For simplicity, assuming intra-state transaction (CGST + SGST)
    // In reality, this would depend on buyer/seller locations
    cgst = gstAmount / 2
    sgst = gstAmount / 2
    igst = gstAmount // For inter-state transactions

    setResults({
      taxableAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      igst,
      rate: parseFloat(gstRate)
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value)
  }

  const handleReset = () => {
    setAmount('')
    setGstRate('18')
    setCalculationType('exclusive')
    setResults(null)
  }

  const copyToClipboard = () => {
    if (!results) return

    const text = `
GST Calculation Results:
${calculationType === 'exclusive' ? 'Amount (Excl. GST)' : 'Taxable Amount'}: ${formatCurrency(results.taxableAmount)}
GST @ ${results.rate}%: ${formatCurrency(results.gstAmount)}
${calculationType === 'exclusive' ? 'Total Amount' : 'Amount (Incl. GST)'}: ${formatCurrency(results.totalAmount)}

Breakdown:
CGST (${results.rate/2}%): ${formatCurrency(results.cgst)}
SGST (${results.rate/2}%): ${formatCurrency(results.sgst)}
IGST (${results.rate}%): ${formatCurrency(results.igst)}
    `.trim()

    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">GST Calculator</h2>
        <p className="text-gray-600">Calculate GST (Goods and Services Tax) for India</p>
      </div>

      {/* Input Form */}
      <Card className="p-6" elevated>
        <div className="space-y-6">
          {/* Calculation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Calculation Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setCalculationType('exclusive')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  calculationType === 'exclusive'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Plus" size={20} />
                  <div className="text-left">
                    <div className="font-semibold">Exclusive GST</div>
                    <div className="text-sm text-gray-600">Add GST to amount</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setCalculationType('inclusive')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  calculationType === 'inclusive'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Minus" size={20} />
                  <div className="text-left">
                    <div className="font-semibold">Inclusive GST</div>
                    <div className="text-sm text-gray-600">Extract GST from amount</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <Input
            label={calculationType === 'exclusive' ? 'Amount (Excluding GST)' : 'Amount (Including GST)'}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in ₹"
            icon="IndianRupee"
            min="0"
            step="0.01"
          />

          {/* GST Rate Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Rate
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gstRates.map((rate) => (
                <button
                  key={rate.value}
                  onClick={() => setGstRate(rate.value)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    gstRate === rate.value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{rate.value}%</div>
                  <div className="text-xs text-gray-600 mt-1">{rate.label.split(' (')[1]?.replace(')', '')}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200" elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">GST Calculation Results</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              icon="Copy"
            >
              Copy
            </Button>
          </div>

          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">
                {calculationType === 'exclusive' ? 'Amount (Excl. GST)' : 'Taxable Amount'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.taxableAmount)}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">GST @ {results.rate}%</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatCurrency(results.gstAmount)}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">
                {calculationType === 'exclusive' ? 'Total Amount' : 'Amount (Incl. GST)'}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(results.totalAmount)}
              </p>
            </div>
          </div>

          {/* GST Breakdown */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">GST Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">CGST ({results.rate/2}%)</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.cgst)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Central GST</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">SGST ({results.rate/2}%)</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.sgst)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">State GST</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">IGST ({results.rate}%)</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.igst)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Integrated GST</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              Note: CGST + SGST applies for intra-state transactions, IGST for inter-state transactions
            </p>
          </div>
        </Card>
      )}

      {/* Information */}
      <Card className="p-6 bg-blue-50 border-blue-200" elevated>
        <h4 className="text-lg font-semibold mb-3 text-blue-900">About GST</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-semibold mb-2">GST Components:</h5>
            <ul className="space-y-1">
              <li>• CGST: Central Goods and Services Tax</li>
              <li>• SGST: State Goods and Services Tax</li>
              <li>• IGST: Integrated Goods and Services Tax</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">When to Use:</h5>
            <ul className="space-y-1">
              <li>• Intra-state: CGST + SGST</li>
              <li>• Inter-state: IGST only</li>
              <li>• Union Territory: CGST + UTGST</li>
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

export default GSTCalculator