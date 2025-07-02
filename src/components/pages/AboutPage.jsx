import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const AboutPage = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'All tools work directly in your browser with optimized performance and instant results.'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your data never leaves your device. All processing happens locally for maximum privacy.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Friendly',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.'
    },
    {
      icon: 'Download',
      title: 'No Downloads',
      description: 'Access all tools instantly without any downloads, installations, or registrations.'
    },
    {
      icon: 'Globe',
      title: 'Always Available',
      description: '24/7 availability with reliable performance and regular updates.'
    },
    {
      icon: 'Heart',
      title: 'User Focused',
      description: 'Designed with user experience in mind, making complex tasks simple and intuitive.'
    }
  ]

  const stats = [
    { number: '25+', label: 'Free Tools Available' },
    { number: '100K+', label: 'Users Served Globally' },
    { number: '99.9%', label: 'Uptime Reliability' },
    { number: '24/7', label: 'Always Available' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center text-white shadow-2xl">
                <ApperIcon name="Info" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              About SmartAppOnline
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your comprehensive platform for professional online tools. We make complex digital tasks 
              simple, accessible, and free for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black gradient-text mb-6">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  At SmartAppOnline, we believe that powerful digital tools shouldn't be 
                  complicated, expensive, or require downloads. Our mission is to democratize 
                  access to professional-grade online utilities.
                </p>
                <p>
                  Whether you're compressing images, calculating EMI, checking your BMI, 
                  or generating QR codes, we provide tools that are fast, secure, and 
                  completely free to use.
                </p>
                <p>
                  We're committed to privacy-first design, ensuring your data stays on 
                  your device while delivering the functionality you need.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <Card key={stat.label} className="p-6 text-center" elevated>
                  <div className="text-3xl font-black gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
              Why Choose SmartAppOnline?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built our platform with your needs in mind, focusing on simplicity, 
              security, and superior performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full text-center" elevated hoverable>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                    <ApperIcon name={feature.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black gradient-text mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge web technologies to deliver 
              fast, reliable, and secure tools that work seamlessly across all devices.
            </p>
          </motion.div>

          <Card className="p-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-0" elevated>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Privacy-First Architecture
                </h3>
                <ul className="space-y-4">
                  {[
                    'Client-side processing for maximum privacy',
                    'No data storage or tracking',
                    'Secure HTTPS encryption',
                    'Open-source algorithms'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <ApperIcon name="Check" size={20} className="text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Performance Optimized
                </h3>
                <ul className="space-y-4">
                  {[
                    'Instant loading and processing',
                    'Mobile-first responsive design',
                    'Cross-browser compatibility',
                    'Regular updates and improvements'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <ApperIcon name="Zap" size={20} className="text-indigo-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="py-12 bg-gray-50">
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

export default AboutPage