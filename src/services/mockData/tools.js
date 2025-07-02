// Mock data for tool categories and tools
export const toolCategories = [
  {
    id: 'image',
    name: 'Image Tools',
    icon: 'Image',
    toolCount: 3,
    description: 'Professional image editing and processing tools'
  },
  {
    id: 'financial',
    name: 'Financial Calculators',
    icon: 'Calculator',
    toolCount: 3,
    description: 'Calculate loans, taxes, and financial metrics'
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    icon: 'Settings',
    toolCount: 2,
    description: 'Everyday utility tools for various tasks'
  },
  {
    id: 'health',
    name: 'Health Calculators',
    icon: 'Heart',
    toolCount: 2,
    description: 'Health and fitness calculation tools'
  }
]

// Mock tools data
export const tools = [
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images without losing quality. Reduce file size for faster loading.',
    category: 'image',
    icon: 'FileImage',
    featured: true,
    tags: ['compression', 'optimization', 'jpeg', 'png']
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension. Perfect for social media, web, and print.',
    category: 'image',
    icon: 'Crop',
    featured: true,
    tags: ['resize', 'dimensions', 'social media']
  },
  {
    id: 'photo-editor',
    name: 'Photo Editor',
    description: 'Edit photos with filters, effects, and adjustments online.',
    category: 'image',
    icon: 'Palette',
    featured: false,
    tags: ['editing', 'filters', 'effects']
  },

  // Financial Calculators
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Calculate GST (Goods and Services Tax) for your business transactions.',
    category: 'financial',
    icon: 'Receipt',
    featured: true,
    tags: ['tax', 'gst', 'business', 'india']
  },
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI for loans with detailed payment breakdown.',
    category: 'financial',
    icon: 'CreditCard',
    featured: true,
    tags: ['loan', 'emi', 'mortgage', 'interest']
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Plan your investments and calculate returns with compound interest.',
    category: 'financial',
    icon: 'TrendingUp',
    featured: false,
    tags: ['investment', 'returns', 'compound interest']
  },

  // Utility Tools
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, contact info, and more.',
    category: 'utility',
    icon: 'QrCode',
    featured: true,
    tags: ['qr code', 'generator', 'url', 'text']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable length and complexity.',
    category: 'utility',
    icon: 'Shield',
    featured: false,
    tags: ['password', 'security', 'generator']
  },

  // Health Calculators
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your health status.',
    category: 'health',
    icon: 'Activity',
    featured: true,
    tags: ['bmi', 'health', 'fitness', 'weight']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    category: 'health',
    icon: 'Calendar',
    featured: true,
    tags: ['age', 'date', 'calculator']
  }
]

export default {
  toolCategories,
  tools
}