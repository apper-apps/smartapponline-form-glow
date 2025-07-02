import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = 'No results found', 
  description = 'Try adjusting your search or browse our categories to find what you need.',
  icon = 'Search',
  actionText = 'Browse All Tools',
  onAction,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8">
        <ApperIcon name={icon} size={48} className="text-indigo-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {onAction && (
        <Button 
          variant="primary" 
          size="lg"
          onClick={onAction}
          icon="Grid3X3"
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty