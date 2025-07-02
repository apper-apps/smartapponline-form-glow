import React, { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  helperText,
  className = '',
  containerClassName = '',
  required = false,
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400'
  const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
  const iconClasses = icon ? 'pl-10' : ''

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input