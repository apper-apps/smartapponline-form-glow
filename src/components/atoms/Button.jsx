import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-indigo-500/25 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md focus:ring-gray-500',
    accent: 'bg-gradient-accent text-white hover:shadow-lg hover:shadow-pink-500/25 focus:ring-pink-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={iconSizes[size]} className="animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && (
          <ApperIcon name={icon} size={iconSizes[size]} className="mr-2" />
        )
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={iconSizes[size]} className="ml-2" />
      )}
    </motion.button>
  )
}

export default Button