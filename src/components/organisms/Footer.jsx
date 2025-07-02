import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
    'Tools': [
      { name: 'Image Tools', href: '/?category=image' },
      { name: 'Financial Calculators', href: '/?category=financial' },
      { name: 'Utility Tools', href: '/?category=utility' },
      { name: 'Health Calculators', href: '/?category=health' },
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: 'Twitter' },
    { name: 'Facebook', href: '#', icon: 'Facebook' },
    { name: 'LinkedIn', href: '#', icon: 'Linkedin' },
    { name: 'GitHub', href: '#', icon: 'Github' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* AdSense Placeholder */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* AdSense Advertisement Placement */}
          <div className="adsense-ad bg-gray-700 rounded-lg p-4 text-center text-gray-400">
            <p className="text-sm">Advertisement Space</p>
            {/* AdSense Code Here */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <ApperIcon name="Zap" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">SmartAppOnline</h2>
                <p className="text-sm text-gray-400">Free Online Tools</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your comprehensive platform for image editing, financial calculations, health utilities, 
              and India-specific services. All tools are free and work directly in your browser.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <p>&copy; 2024 SmartAppOnline. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <p className="hidden md:inline">Made with ❤️ for users worldwide</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} />
                <span>Secure & Private</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" size={16} />
                <span>Fast & Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer