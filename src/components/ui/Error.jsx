import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = 'Something went wrong', 
  description = 'Please try again or contact support if the problem persists.',
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" size={40} className="text-red-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {message}
      </h3>
      
      <p className="text-gray-600 max-w-md mb-8">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button 
            variant="primary" 
            onClick={onRetry}
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
          icon="Home"
        >
          Go Home
        </Button>
      </div>
    </motion.div>
  )
}

export default Error