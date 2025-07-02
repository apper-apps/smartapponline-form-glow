import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { toolCategories } from '@/services/mockData/tools'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'About', href: '/about', icon: 'Info' },
    { name: 'Contact', href: '/contact', icon: 'Mail' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <ApperIcon name="Zap" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">SmartAppOnline</h1>
              <p className="text-xs text-gray-500">Free Online Tools</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200">
                <ApperIcon name="Grid3X3" size={16} />
                <span>Tools</span>
                <ApperIcon name="ChevronDown" size={14} />
              </button>

              <AnimatePresence>
                {isToolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-50"
                  >
                    <div className="px-4 pb-2">
                      <h3 className="text-sm font-semibold text-gray-900">Tool Categories</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {toolCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/?category=${category.id}`}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                            <ApperIcon name={category.icon} size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{category.name}</p>
                            <p className="text-xs text-gray-500">{category.toolCount} tools</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-200">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tool Categories
                </p>
                {toolCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/?category=${category.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center text-white">
                      <ApperIcon name={category.icon} size={14} />
                    </div>
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500">({category.toolCount})</span>
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header