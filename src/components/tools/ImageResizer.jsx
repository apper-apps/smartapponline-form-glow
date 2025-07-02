import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FileUpload from "@/components/molecules/FileUpload";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";

const ImageResizer = () => {
  const [originalFile, setOriginalFile] = useState(null)
  const [resizedFile, setResizedFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [dimensions, setDimensions] = useState({ width: '', height: '' })
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height })
      setDimensions({ width: img.width.toString(), height: img.height.toString() })
    }
    img.src = URL.createObjectURL(file)

    setOriginalFile(file)
    setResizedFile(null)
  }

  const handleDimensionChange = (field, value) => {
    const numValue = parseInt(value) || 0
    
    if (maintainAspectRatio && originalDimensions.width && originalDimensions.height) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      
      if (field === 'width') {
        setDimensions({
          width: value,
          height: value ? Math.round(numValue / aspectRatio).toString() : ''
        })
      } else {
        setDimensions({
          width: value ? Math.round(numValue * aspectRatio).toString() : '',
          height: value
        })
      }
    } else {
      setDimensions(prev => ({ ...prev, [field]: value }))
    }
  }

  const resizeImage = async () => {
    if (!originalFile) {
      toast.error('Please select an image first')
      return
    }

    const width = parseInt(dimensions.width)
    const height = parseInt(dimensions.height)

    if (!width || !height || width <= 0 || height <= 0) {
      toast.error('Please enter valid dimensions')
      return
    }

    setProcessing(true)
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = width
          canvas.height = height
ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob((blob) => {
            // Create a blob with filename property for compatibility
            const resizedBlob = new Blob([blob], { type: originalFile.type })
            resizedBlob.name = `resized_${originalFile.name}`
            resizedBlob.size = blob.size
            setResizedFile(resizedBlob)
            resolve()
          }, originalFile.type, 0.9)
        }
        img.src = URL.createObjectURL(originalFile)
      })

      toast.success('Image resized successfully!')
    } catch (error) {
      toast.error('Failed to resize image')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!resizedFile) return

    const url = URL.createObjectURL(resizedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = resizedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  const handleReset = () => {
    setOriginalFile(null)
    setResizedFile(null)
    setDimensions({ width: '', height: '' })
    setOriginalDimensions({ width: 0, height: 0 })
  }

  const presetSizes = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'HD (720p)', width: 1280, height: 720 },
    { name: 'Full HD (1080p)', width: 1920, height: 1080 }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Resizer</h2>
        <p className="text-gray-600">Change image dimensions while maintaining quality</p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        accept="image/*"
        description="Drop your image here or click to upload"
      />

      {/* Resize Settings */}
      {originalFile && (
        <Card className="p-6" elevated>
          <h3 className="text-lg font-semibold mb-4">Resize Settings</h3>
          
          {/* Original Dimensions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Original Dimensions</p>
            <p className="text-lg font-semibold text-gray-900">
              {originalDimensions.width} × {originalDimensions.height} pixels
            </p>
          </div>

          {/* Dimension Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Width (pixels)"
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              min="1"
              icon="ArrowLeftRight"
            />
            <Input
              label="Height (pixels)"
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              min="1"
              icon="ArrowUpDown"
            />
          </div>

          {/* Aspect Ratio Toggle */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="aspectRatio"
              checked={maintainAspectRatio}
              onChange={(e) => setMaintainAspectRatio(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="aspectRatio" className="ml-3 text-sm font-medium text-gray-700">
              Maintain aspect ratio
            </label>
          </div>

          {/* Preset Sizes */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Presets</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {presetSizes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setDimensions({ 
                    width: preset.width.toString(), 
                    height: preset.height.toString() 
                  })}
                  className="p-2 text-xs bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-gray-500">{preset.width}×{preset.height}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={resizeImage}
            loading={processing}
            disabled={processing || !dimensions.width || !dimensions.height}
            icon="Maximize"
            size="lg"
            className="w-full"
          >
            Resize Image
          </Button>
        </Card>
      )}

      {/* Result */}
      {resizedFile && (
        <Card className="p-6 bg-green-50 border-green-200" elevated>
          <h3 className="text-lg font-semibold mb-4 text-green-800">Resized Image</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
            <div>
              <p className="text-sm text-green-600">New Dimensions</p>
              <p className="font-medium text-green-800">
                {dimensions.width} × {dimensions.height}
              </p>
            </div>
            <div>
              <p className="text-sm text-green-600">File Size</p>
              <p className="font-medium text-green-800">
                {(resizedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <div>
              <p className="text-sm text-green-600">Format</p>
              <p className="font-medium text-green-800">{resizedFile.type.split('/')[1].toUpperCase()}</p>
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

          {/* Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Original</p>
              <img
                src={URL.createObjectURL(originalFile)}
                alt="Original"
                className="w-full max-h-64 object-contain rounded-lg border bg-white"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Resized</p>
              <img
                src={URL.createObjectURL(resizedFile)}
                alt="Resized"
                className="w-full max-h-64 object-contain rounded-lg border bg-white"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Reset Button */}
      {originalFile && (
        <div className="flex justify-center">
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

export default ImageResizer