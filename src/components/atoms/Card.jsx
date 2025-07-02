import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  gradient = false,
  elevated = false,
  glass = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
  const gradientClasses = gradient ? 'bg-gradient-card' : 'bg-white'
  const elevatedClasses = elevated ? 'card-elevated' : 'shadow-md'
  const glassClasses = glass ? 'glass' : ''

  const cardClasses = `${baseClasses} ${hoverClasses} ${gradientClasses} ${elevatedClasses} ${glassClasses} ${className}`

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
        whileTap={hoverable ? { scale: 0.98 } : {}}
        className={cardClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

export default Card