import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FileUpload = ({ 
  onFileSelect, 
  accept = "*/*", 
  multiple = false, 
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  description = "Click to upload or drag and drop files here"
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState('')

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    }
    return null
  }

  const handleFiles = (files) => {
    const fileList = Array.from(files)
    const validFiles = []
    
    for (const file of fileList) {
      const error = validateFile(file)
      if (error) {
        setError(error)
        return
      }
      validFiles.push(file)
    }

    setError('')
    if (multiple) {
      onFileSelect(validFiles)
    } else {
      onFileSelect(validFiles[0])
    }
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }, [])

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
            <ApperIcon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              {description}
            </p>
            <p className="text-sm text-gray-500">
              {accept !== "*/*" && `Supported formats: ${accept}`}
              {maxSize && ` • Max size: ${Math.round(maxSize / 1024 / 1024)}MB`}
            </p>
          </div>

          <Button variant="outline" size="md">
            <ApperIcon name="FolderOpen" className="mr-2" />
            Choose Files
          </Button>
        </div>
      </motion.div>

      {error && (
        <div className="flex items-center text-red-600 text-sm">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload