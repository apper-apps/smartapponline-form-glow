import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const DisclaimerPage = () => {
  const sections = [
    {
      title: 'General Information',
      icon: 'Info',
      content: [
        'The information and tools provided on SmartAppOnline are for general informational purposes only.',
        'While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind.',
        'The use of our tools is at your own risk and discretion.',
        'We recommend verifying results from our calculators with professional advisors when making important decisions.'
      ]
    },
    {
      title: 'Financial Calculators Disclaimer',
      icon: 'Calculator',
      content: [
        'Our financial calculators are simplified tools designed to provide estimates only.',
        'Results should not be considered as professional financial advice.',
        'GST, EMI, and other financial calculations may not reflect actual rates or current regulations.',
        'Always consult with qualified financial professionals for accurate financial planning and advice.'
      ]
    },
    {
      title: 'Health Calculators Disclaimer',
      icon: 'Heart',
      content: [
        'Health calculators like BMI are for informational purposes and should not replace professional medical advice.',
        'Results are based on standard formulas and may not be suitable for all individuals.',
        'These tools are not intended to diagnose, treat, cure, or prevent any disease or health condition.',
        'Always consult with healthcare professionals for personalized medical advice and treatment.'
      ]
    },
    {
      title: 'Image Processing Tools',
      icon: 'Image',
      content: [
        'Image processing results may vary depending on the input file and your device capabilities.',
        'We cannot guarantee the quality or accuracy of processed images.',
        'Always keep backups of your original files before processing.',
        'Some advanced features may not work on all browsers or devices.'
      ]
    },
    {
      title: 'Data Accuracy',
      icon: 'Database',
      content: [
        'While we strive to maintain accurate data, we cannot guarantee the completeness or accuracy of all information.',
        'Exchange rates, pincode data, and other reference information may be outdated.',
        'Users should verify critical information from official sources.',
        'We are not responsible for any errors or omissions in the data provided.'
      ]
    },
    {
      title: 'Technical Limitations',
      icon: 'AlertTriangle',
      content: [
        'Our tools depend on your browser capabilities and internet connection.',
        'Some features may not work on older browsers or devices.',
        'File size and processing limitations may apply to certain tools.',
        'We cannot guarantee compatibility with all file formats or sizes.'
      ]
    },
    {
      title: 'Third-Party Content',
      icon: 'ExternalLink',
      content: [
        'Our website may contain links to third-party websites or services.',
        'We are not responsible for the content, privacy policies, or practices of third-party sites.',
        'External links are provided for convenience and do not constitute endorsement.',
        'Users access third-party content at their own risk.'
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: 'Shield',
      content: [
        'SmartAppOnline and its operators shall not be liable for any damages arising from the use of our services.',
        'This includes direct, indirect, incidental, punitive, and consequential damages.',
        'We provide our services "as is" without warranties of any kind.',
        'Your use of our tools is entirely at your own risk and responsibility.'
      ]
    }
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
                <ApperIcon name="AlertTriangle" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              Disclaimer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Important information about the use of SmartAppOnline tools and services. 
              Please read this disclaimer carefully before using our platform.
            </p>
            <div className="mt-8 inline-flex items-center bg-amber-50 text-amber-700 px-6 py-3 rounded-full border border-amber-200">
              <ApperIcon name="AlertCircle" size={20} className="mr-2" />
              <span className="font-medium">Important Notice - Please Read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-black mb-6">
              Use at Your Own Risk
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: 'AlertTriangle', title: 'Estimates Only', desc: 'Results are approximations, not professional advice' },
                { icon: 'UserCheck', title: 'Verify Results', desc: 'Always confirm important calculations independently' },
                { icon: 'FileX', title: 'No Guarantees', desc: 'We cannot guarantee accuracy or suitability' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={item.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-amber-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8" elevated>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <ApperIcon name={section.icon} size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Advice Notice */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200" elevated>
              <div className="text-center">
                <ApperIcon name="AlertOctagon" size={48} className="text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-red-800 mb-4">
                  Professional Advice Required
                </h2>
                <p className="text-xl text-red-700 mb-6 max-w-2xl mx-auto">
                  For important financial, health, or legal decisions, always consult with 
                  qualified professionals. Our tools provide estimates only.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <ApperIcon name="DollarSign" size={32} className="text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold text-red-800">Financial Decisions</h3>
                    <p className="text-sm text-red-600">Consult certified financial advisors</p>
                  </div>
                  <div className="text-center">
                    <ApperIcon name="Heart" size={32} className="text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold text-red-800">Health Matters</h3>
                    <p className="text-sm text-red-600">Seek professional medical advice</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-0" elevated>
              <ApperIcon name="MessageSquare" size={48} className="text-indigo-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Questions About This Disclaimer?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                If you need clarification about any part of this disclaimer or have 
                concerns about using our tools, please contact us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200"
              >
                <ApperIcon name="Mail" size={20} className="mr-2" />
                Get in Touch
              </a>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="py-12">
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

export default DisclaimerPage