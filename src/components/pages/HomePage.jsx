import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import CategoriesSection from '@/components/organisms/CategoriesSection'
import ToolsGrid from '@/components/organisms/ToolsGrid'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'
import { toolsService } from '@/services/api/toolsService'

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tools, setTools] = useState([])
  const [filteredTools, setFilteredTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    loadTools()
  }, [])

  useEffect(() => {
    filterTools()
  }, [tools, searchTerm, selectedCategory])

  const loadTools = async () => {
    try {
      setLoading(true)
      const data = await toolsService.getAll()
      setTools(data)
    } catch (error) {
      console.error('Failed to load tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterTools = () => {
    let filtered = tools

    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTools(filtered)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setSelectedCategory('')
    setSearchParams({})
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setSearchTerm('')
    setSearchParams({ category: categoryId })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSearchParams({})
  }

  const getToolsTitle = () => {
    if (selectedCategory) {
      const categoryNames = {
        'image': 'Image Tools',
        'financial': 'Financial Calculators',
        'utility': 'Utility Tools',
        'health': 'Health Calculators'
      }
      return categoryNames[selectedCategory] || 'Tools'
    }
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`
    }
    return 'Featured Tools'
  }

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      
      {!searchTerm && !selectedCategory && (
        <CategoriesSection onCategorySelect={handleCategorySelect} />
      )}

      <section id="tools-section" className="py-16">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Loading type="skeleton" message="Loading tools..." />
          </div>
        ) : filteredTools.length > 0 ? (
          <ToolsGrid 
            tools={filteredTools} 
            title={getToolsTitle()}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Empty
              title="No tools found"
              description={
                searchTerm || selectedCategory
                  ? "Try adjusting your search or browse other categories to find what you need."
                  : "We're working on adding more tools. Check back soon!"
              }
              icon="Search"
              actionText="Browse All Categories"
              onAction={handleClearFilters}
            />
          </div>
        )}
      </section>

      {/* AdSense Placeholder */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="adsense-ad bg-white rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 shadow-sm">
            <p className="text-gray-500 font-medium">Advertisement Space</p>
            <p className="text-sm text-gray-400 mt-1">AdSense Code Here</p>
            {/* AdSense Code Here */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage