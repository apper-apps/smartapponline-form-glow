import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'default', message = 'Loading...', className = '' }) => {
  if (type === 'skeleton') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl shimmer"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded shimmer"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="w-20 h-6 bg-gray-200 rounded-full shimmer"></div>
                <div className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full mb-4"
      />
      <p className="text-lg font-medium text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">Please wait while we load your content</p>
    </div>
  )
}

export default Loading