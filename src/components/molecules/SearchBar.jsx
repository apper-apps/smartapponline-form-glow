import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'

const SearchBar = ({ onSearch, placeholder = "Search tools...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative max-w-2xl mx-auto ${className}`}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <ApperIcon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                onSearch('')
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  )
}

export default SearchBar