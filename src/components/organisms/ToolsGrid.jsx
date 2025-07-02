import React from 'react'
import { motion } from 'framer-motion'
import ToolCard from '@/components/molecules/ToolCard'

const ToolsGrid = ({ tools, title = "Available Tools", className = '' }) => {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tools found</h3>
        <p className="text-gray-500">Try adjusting your search or browse categories</p>
      </div>
    )
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black gradient-text mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional-grade tools designed for efficiency and ease of use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ToolsGrid