import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const CategoryCard = ({ category, onSelect, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card 
        onClick={() => onSelect(category.id)}
        className="p-6 cursor-pointer tool-card border border-gray-100 hover:border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-purple-50"
        elevated
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
            <ApperIcon name={category.icon} size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 gradient-text">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600">
              {category.description}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Badge variant="primary" size="sm">
              {category.toolCount} tools
            </Badge>
            {category.featured && (
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default CategoryCard