import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { toolsService } from '@/services/api/toolsService'

// Tool Components
import ImageCompressor from '@/components/tools/ImageCompressor'
import ImageResizer from '@/components/tools/ImageResizer'
import GSTCalculator from '@/components/tools/GSTCalculator'
import EMICalculator from '@/components/tools/EMICalculator'
import AgeCalculator from '@/components/tools/AgeCalculator'
import BMICalculator from '@/components/tools/BMICalculator'
import QRCodeGenerator from '@/components/tools/QRCodeGenerator'

const ToolPage = () => {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTool()
  }, [toolId])

  const loadTool = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await toolsService.getById(toolId)
      if (!data) {
        setError('Tool not found')
        return
      }
      setTool(data)
    } catch (err) {
      setError('Failed to load tool')
    } finally {
      setLoading(false)
    }
  }

  const getToolComponent = () => {
    const components = {
      'image-compressor': ImageCompressor,
      'image-resizer': ImageResizer,
      'gst-calculator': GSTCalculator,
      'emi-calculator': EMICalculator,
      'age-calculator': AgeCalculator,
      'bmi-calculator': BMICalculator,
      'qr-generator': QRCodeGenerator
    }
    
    const Component = components[toolId]
    return Component ? <Component /> : (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-2xl flex items-center justify-center">
          <ApperIcon name="Construction" size={48} className="text-yellow-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
        <p className="text-gray-500">This tool is under development and will be available soon.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading message="Loading tool..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error 
            message={error}
            onRetry={loadTool}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              icon="ArrowLeft"
              className="mb-6"
            >
              Back to Tools
            </Button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
                <ApperIcon name={tool?.icon || 'Tool'} size={40} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black gradient-text mb-4">
              {tool?.name || 'Tool'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {tool?.description || 'Professional online tool for your needs'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 max-w-4xl mx-auto" elevated>
              {getToolComponent()}
            </Card>
          </motion.div>

          {/* AdSense Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="adsense-ad bg-white rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 shadow-sm max-w-4xl mx-auto">
              <p className="text-gray-500 font-medium">Advertisement Space</p>
              <p className="text-sm text-gray-400 mt-1">AdSense Code Here</p>
              {/* AdSense Code Here */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ToolPage