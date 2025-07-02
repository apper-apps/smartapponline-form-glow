import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setLoading(false)
  }

  const contactInfo = [
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@smartapponline.com',
      action: 'mailto:support@smartapponline.com'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: '#'
    },
    {
      icon: 'Phone',
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ]

  const faqs = [
    {
      question: 'Are all tools completely free?',
      answer: 'Yes, all our tools are completely free to use with no hidden charges or premium features.'
    },
    {
      question: 'Do you store my uploaded files?',
      answer: 'No, all processing happens in your browser. We never store or have access to your files.'
    },
    {
      question: 'Can I use these tools for commercial purposes?',
      answer: 'Yes, you can use our tools for both personal and commercial projects without any restrictions.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account required! All tools work instantly without any registration or login.'
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
                <ApperIcon name="Mail" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Have questions, suggestions, or need help? We're here to assist you with anything 
              related to SmartAppOnline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8" elevated>
                <h2 className="text-3xl font-bold gradient-text mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      icon="User"
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      icon="Mail"
                    />
                  </div>
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    icon="MessageSquare"
                  />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    icon="Send"
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-6">
                  Other Ways to Reach Us
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Choose the method that works best for you. We're committed to 
                  providing excellent support and quick responses.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={info.title} className="p-6" hoverable elevated>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <ApperIcon name={info.icon} size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {info.description}
                        </p>
                        <a
                          href={info.action}
                          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                        >
                          {info.contact}
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-0" elevated>
                <div className="text-center">
                  <ApperIcon name="Clock" size={48} className="text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black gradient-text mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about SmartAppOnline.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6" elevated>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
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

export default ContactPage