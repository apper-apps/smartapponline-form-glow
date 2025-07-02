import { tools } from '@/services/mockData/tools'

/**
 * Tools API Service
 * Provides methods to interact with tools data
 * Currently uses mock data but can be extended to use real APIs
 */
class ToolsService {
  /**
   * Get all tools
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of tools
   */
  async getAll(filters = {}) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredTools = [...tools]
      
      // Apply category filter
      if (filters.category) {
        filteredTools = filteredTools.filter(tool => tool.category === filters.category)
      }
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredTools = filteredTools.filter(tool =>
          tool.name.toLowerCase().includes(searchTerm) ||
          tool.description.toLowerCase().includes(searchTerm) ||
          tool.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      }
      
      // Apply featured filter
      if (filters.featured !== undefined) {
        filteredTools = filteredTools.filter(tool => tool.featured === filters.featured)
      }
      
      return filteredTools
    } catch (error) {
      console.error('Error fetching tools:', error)
      throw new Error('Failed to fetch tools')
    }
  }

  /**
   * Get tool by ID
   * @param {string} id - Tool ID
   * @returns {Promise<Object|null>} Tool object or null if not found
   */
  async getById(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const tool = tools.find(tool => tool.id === id)
      return tool || null
    } catch (error) {
      console.error('Error fetching tool by ID:', error)
      throw new Error('Failed to fetch tool')
    }
  }

  /**
   * Get featured tools
   * @param {number} limit - Maximum number of tools to return
   * @returns {Promise<Array>} Array of featured tools
   */
  async getFeatured(limit = 6) {
    try {
      const allTools = await this.getAll({ featured: true })
      return allTools.slice(0, limit)
    } catch (error) {
      console.error('Error fetching featured tools:', error)
      throw new Error('Failed to fetch featured tools')
    }
  }

  /**
   * Get tools by category
   * @param {string} category - Category ID
   * @returns {Promise<Array>} Array of tools in the category
   */
  async getByCategory(category) {
    try {
      return await this.getAll({ category })
    } catch (error) {
      console.error('Error fetching tools by category:', error)
      throw new Error('Failed to fetch tools by category')
    }
  }

  /**
   * Search tools
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching tools
   */
  async search(query) {
    try {
      if (!query || query.trim().length === 0) {
        return []
      }
      
      return await this.getAll({ search: query.trim() })
    } catch (error) {
      console.error('Error searching tools:', error)
      throw new Error('Failed to search tools')
    }
  }

  /**
   * Get tool statistics
   * @returns {Promise<Object>} Statistics object
   */
  async getStats() {
    try {
      const allTools = await this.getAll()
      const categories = [...new Set(allTools.map(tool => tool.category))]
      
      return {
        totalTools: allTools.length,
        totalCategories: categories.length,
        featuredTools: allTools.filter(tool => tool.featured).length,
        toolsByCategory: categories.reduce((acc, category) => {
          acc[category] = allTools.filter(tool => tool.category === category).length
          return acc
        }, {})
      }
    } catch (error) {
      console.error('Error fetching tool statistics:', error)
      throw new Error('Failed to fetch tool statistics')
    }
  }
}

// Export singleton instance
export const toolsService = new ToolsService()

// Export class for testing or custom instances
export { ToolsService }

export default toolsService