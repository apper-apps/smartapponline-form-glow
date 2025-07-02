import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const ToolCard = ({ tool, className = '' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tool/${tool.id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card 
        onClick={handleClick}
        className="p-6 h-full cursor-pointer tool-card border border-gray-100 hover:border-indigo-200 bg-gradient-to-br from-white to-gray-50"
        elevated
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <ApperIcon name={tool.icon} size={24} />
            </div>
          </div>
          {tool.popular && (
            <Badge variant="accent" size="sm">
              Popular
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge variant="default" size="sm">
            {tool.category}
          </Badge>
          <ApperIcon 
            name="ArrowRight" 
            size={16} 
            className="text-gray-400 group-hover:text-indigo-600 transition-colors" 
          />
        </div>
      </Card>
    </motion.div>
  )
}

export default ToolCard