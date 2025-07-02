import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const TermsPage = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: 'FileCheck',
      content: [
        'By accessing and using SmartAppOnline, you accept and agree to be bound by the terms and provision of this agreement.',
        'These terms apply to all visitors, users, and others who access or use the service.',
        'If you disagree with any part of these terms, then you may not access the service.',
        'We reserve the right to update these terms at any time without prior notice.'
      ]
    },
    {
      title: 'Use of Services',
      icon: 'Tool',
      content: [
        'Our tools are provided free of charge for personal and commercial use.',
        'You may use our services for any lawful purpose and in accordance with these terms.',
        'You are prohibited from using our services for any illegal or unauthorized purpose.',
        'You must not transmit any worms, viruses, or code of a destructive nature through our services.'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: 'Users',
      content: [
        'You are responsible for maintaining the confidentiality of any files you process.',
        'You acknowledge that all processing happens locally in your browser.',
        'You must ensure that any content you process does not violate any applicable laws.',
        'You agree not to attempt to reverse engineer or exploit our services in any way.'
      ]
    },
    {
      title: 'Intellectual Property',
      icon: 'Copyright',
      content: [
        'The service and its original content, features, and functionality are owned by SmartAppOnline.',
        'Our trademarks and trade dress may not be used without our prior written consent.',
        'You retain all rights to any content you process using our tools.',
        'We claim no ownership or intellectual property rights over your processed content.'
      ]
    },
    {
      title: 'Service Availability',
      icon: 'Globe',
      content: [
        'We strive to maintain high availability but cannot guarantee uninterrupted service.',
        'We may temporarily suspend service for maintenance or updates without notice.',
        'We reserve the right to modify or discontinue any part of the service at any time.',
        'We are not liable for any downtime or service interruptions.'
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: 'Shield',
      content: [
        'Our services are provided "as is" without warranties of any kind.',
        'We shall not be liable for any indirect, incidental, or consequential damages.',
        'You use our services at your own risk and discretion.',
        'Our total liability shall not exceed the amount you paid for the service (which is zero for free services).'
      ]
    },
    {
      title: 'Privacy and Data',
      icon: 'Lock',
      content: [
        'We process all data locally in your browser and do not store your files.',
        'We may collect anonymous usage statistics to improve our services.',
        'Please review our Privacy Policy for detailed information about data handling.',
        'We are committed to protecting your privacy and maintaining data security.'
      ]
    },
    {
      title: 'Termination',
      icon: 'XCircle',
      content: [
        'We may terminate or suspend access to our service immediately, without prior notice.',
        'Termination may occur for conduct that we believe violates these terms.',
        'Upon termination, your right to use the service will cease immediately.',
        'All provisions that should survive termination shall survive, including ownership and limitation of liability.'
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
                <ApperIcon name="FileText" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using SmartAppOnline. 
              These terms govern your use of our free online tools and services.
            </p>
            <div className="mt-8 inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full border border-blue-200">
              <ApperIcon name="Calendar" size={20} className="mr-2" />
              <span className="font-medium">Effective Date: December 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-black mb-6">
              Key Terms Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: 'Gift', title: 'Free to Use', desc: 'All tools are completely free for personal and commercial use' },
                { icon: 'Shield', title: 'No Registration', desc: 'Use all services without creating an account' },
                { icon: 'Heart', title: 'Fair Use', desc: 'Use responsibly and in accordance with applicable laws' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={item.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
              <ApperIcon name="HelpCircle" size={48} className="text-indigo-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Questions About Terms?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                If you have any questions about these terms of service or need clarification 
                on any point, don't hesitate to reach out to us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200"
              >
                <ApperIcon name="Mail" size={20} className="mr-2" />
                Contact Support
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

export default TermsPage