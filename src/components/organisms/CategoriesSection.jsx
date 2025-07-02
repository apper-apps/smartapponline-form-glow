import React from 'react'
import { motion } from 'framer-motion'
import CategoryCard from '@/components/molecules/CategoryCard'
import { toolCategories } from '@/services/mockData/tools'

const CategoriesSection = ({ onCategorySelect }) => {
  return (
    <section id="categories-section" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover specialized tools organized by category. From image editing to financial calculations, 
            we have everything you need for your daily digital tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CategoryCard 
                category={category} 
                onSelect={onCategorySelect}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* AdSense Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="adsense-ad bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Advertisement Space</p>
            <p className="text-sm text-gray-400 mt-1">AdSense Code Here</p>
            {/* AdSense Code Here */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoriesSection