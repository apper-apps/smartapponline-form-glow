import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: 'Database',
      content: [
        'We do not collect, store, or process any personal files or documents you upload to our tools.',
        'All file processing happens locally in your browser, ensuring complete privacy.',
        'We may collect anonymous usage statistics to improve our services, but this data cannot be linked to individual users.',
        'No personal information is required to use our tools - no registration, no login, no tracking.'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: 'Settings',
      content: [
        'Since we don\'t collect personal data, we cannot use it for any purpose.',
        'Anonymous usage statistics help us understand which tools are most popular and improve performance.',
        'We use this aggregated data solely for service improvement and never share it with third parties.',
        'All tool operations are performed client-side, meaning your data never leaves your device.'
      ]
    },
    {
      title: 'Data Security',
      icon: 'Shield',
      content: [
        'All data processing occurs locally in your browser using secure, client-side JavaScript.',
        'We use HTTPS encryption to secure the connection between your browser and our servers.',
        'No files are uploaded to our servers - everything stays on your device.',
        'We regularly update our security practices to ensure the highest level of protection.'
      ]
    },
    {
      title: 'Third-Party Services',
      icon: 'Globe',
      content: [
        'We may use Google AdSense to display relevant advertisements on our website.',
        'AdSense may use cookies to show ads based on your interests, but we don\'t control this process.',
        'We use analytics services to understand website traffic, but all data is anonymized.',
        'No third-party service has access to the files you process using our tools.'
      ]
    },
    {
      title: 'Your Rights',
      icon: 'User',
      content: [
        'Since we don\'t collect personal data, there\'s no personal information to access, modify, or delete.',
        'You can clear your browser cache and cookies at any time to remove any locally stored preferences.',
        'You have the right to use our tools without providing any personal information.',
        'You can contact us if you have any questions about our privacy practices.'
      ]
    },
    {
      title: 'Updates to This Policy',
      icon: 'RefreshCw',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices.',
        'Any significant changes will be prominently displayed on our website.',
        'Continued use of our services after policy updates constitutes acceptance of the new terms.',
        'We recommend reviewing this policy periodically to stay informed about our privacy practices.'
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
                <ApperIcon name="Shield" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your privacy is our top priority. Learn how we protect your data and respect your privacy 
              while providing powerful online tools.
            </p>
            <div className="mt-8 inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
              <ApperIcon name="Check" size={20} className="mr-2" />
              <span className="font-medium">Last updated: December 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy-First Highlight */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-black mb-6">
              Privacy-First by Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: 'Lock', title: 'No Data Collection', desc: 'We don\'t collect your personal files' },
                { icon: 'Monitor', title: 'Client-Side Processing', desc: 'All tools work in your browser' },
                { icon: 'UserX', title: 'No Registration', desc: 'Use all tools without signing up' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={item.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-indigo-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
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

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-0" elevated>
              <ApperIcon name="MessageCircle" size={48} className="text-indigo-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                If you have any questions about this privacy policy or our data practices, 
                we're here to help. Contact us anytime.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200"
              >
                <ApperIcon name="Mail" size={20} className="mr-2" />
                Contact Us
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

export default PrivacyPage