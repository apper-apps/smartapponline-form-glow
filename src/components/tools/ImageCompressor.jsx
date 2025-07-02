import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FileUpload from "@/components/molecules/FileUpload";
import Card from "@/components/atoms/Card";

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState(null)
  const [compressedFile, setCompressedFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [targetSize, setTargetSize] = useState(100)
  const [quality, setQuality] = useState(0.8)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const compressImage = async (file, quality) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob((blob) => {
          resolve(blob)
        }, file.type, quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }
    setOriginalFile(file)
    setCompressedFile(null)
  }

  const handleCompress = async () => {
    if (!originalFile) {
      toast.error('Please select an image first')
      return
    }

    setProcessing(true)
    try {
      let currentQuality = quality
      let compressedBlob = await compressImage(originalFile, currentQuality)
      
      // Try to achieve target size
      const targetSizeBytes = targetSize * 1024
      let attempts = 0
      
      while (compressedBlob.size > targetSizeBytes && currentQuality > 0.1 && attempts < 10) {
        currentQuality -= 0.1
        compressedBlob = await compressImage(originalFile, currentQuality)
attempts++
      }

      // Create file-like object from blob
      const compressedFile = new Blob([compressedBlob], { type: originalFile.type })
      compressedFile.name = `compressed_${originalFile.name}`
      compressedFile.lastModified = Date.now()

      setCompressedFile(compressedFile)
      toast.success('Image compressed successfully!')
    } catch (error) {
      toast.error('Failed to compress image')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedFile) return

    const url = URL.createObjectURL(compressedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = compressedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  const handleReset = () => {
    setOriginalFile(null)
    setCompressedFile(null)
    setTargetSize(100)
    setQuality(0.8)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Compressor</h2>
        <p className="text-gray-600">Reduce image file size while maintaining quality</p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        accept="image/*"
        description="Drop your image here or click to upload"
      />

      {/* Settings */}
      {originalFile && (
        <Card className="p-6" elevated>
          <h3 className="text-lg font-semibold mb-4">Compression Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Size (KB)
              </label>
              <input
                type="number"
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                min="10"
                max="5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality ({Math.round(quality * 100)}%)
              </label>
              <input
                type="range"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                min="0.1"
                max="1"
                step="0.1"
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Original File Info */}
      {originalFile && (
        <Card className="p-6" elevated>
          <h3 className="text-lg font-semibold mb-4">Original Image</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">File Name</p>
              <p className="font-medium truncate" title={originalFile.name}>
                {originalFile.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">File Size</p>
              <p className="font-medium">{formatFileSize(originalFile.size)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{originalFile.type}</p>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={handleCompress}
                loading={processing}
                disabled={processing}
                icon="Zap"
                size="sm"
              >
                Compress
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Compressed File Info */}
      {compressedFile && (
        <Card className="p-6 bg-green-50 border-green-200" elevated>
          <h3 className="text-lg font-semibold mb-4 text-green-800">Compressed Image</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
            <div>
              <p className="text-sm text-green-600">New Size</p>
              <p className="font-medium text-green-800">{formatFileSize(compressedFile.size)}</p>
            </div>
            <div>
              <p className="text-sm text-green-600">Reduction</p>
              <p className="font-medium text-green-800">
                {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-green-600">Savings</p>
              <p className="font-medium text-green-800">
                {formatFileSize(originalFile.size - compressedFile.size)}
              </p>
            </div>
            <div>
              <Button
                variant="accent"
                onClick={handleDownload}
                icon="Download"
                size="sm"
              >
                Download
              </Button>
            </div>
          </div>
          
          {/* Preview Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Original</p>
              <img
                src={URL.createObjectURL(originalFile)}
                alt="Original"
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Compressed</p>
              <img
                src={URL.createObjectURL(compressedFile)}
                alt="Compressed"
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {originalFile && (
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handleReset}
            icon="RotateCcw"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageCompressor