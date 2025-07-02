import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'

const HeroSection = ({ onSearch }) => {
  const features = [
    { icon: 'Zap', text: 'Lightning Fast' },
    { icon: 'Shield', text: 'Secure & Private' },
    { icon: 'Smartphone', text: 'Mobile Friendly' },
    { icon: 'Download', text: 'No Downloads' }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black gradient-text leading-tight">
              Smart Tools for
              <br />
              <span className="text-6xl md:text-8xl">Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access powerful online tools for image editing, financial calculations, 
              health utilities, and more. All free, secure, and works in your browser.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={onSearch}
              placeholder="Search from 25+ tools..."
              className="mb-6"
            />
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20"
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  <ApperIcon name={feature.icon} size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12"
          >
            <Button 
              variant="primary" 
              size="xl"
              onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ApperIcon name="Rocket" className="mr-2" />
              Explore Tools
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ApperIcon name="Grid3X3" className="mr-2" />
              Browse Categories
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200"
          >
            {[
              { number: '25+', label: 'Free Tools' },
              { number: '100K+', label: 'Users Served' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Available' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection