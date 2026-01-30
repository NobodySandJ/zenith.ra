import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock
} from 'react-icons/hi'
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { useTheme } from '@context/ThemeContext'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const { settings } = useTheme()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success(t('contact.messageSent'))
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setLoading(false)
  }

  const contactInfo = [
    {
      icon: HiOutlineMail,
      label: t('contact.email'),
      value: settings.contact_email || 'hello@zenith-ra.com',
      href: `mailto:${settings.contact_email || 'hello@zenith-ra.com'}`
    },
    {
      icon: HiOutlinePhone,
      label: t('contact.phone'),
      value: settings.contact_phone || '+62 812 3456 7890',
      href: `tel:${settings.contact_phone || '+62 812 3456 7890'}`
    },
    {
      icon: HiOutlineLocationMarker,
      label: 'Address',
      value: settings.contact_address || 'Jakarta, Indonesia',
      href: null
    },
    {
      icon: HiOutlineClock,
      label: t('contact.businessHours'),
      value: `${t('contact.mondayFriday')}: 09:00 - 18:00`,
      href: null
    },
  ]

  const socialLinks = [
    { icon: FaInstagram, url: settings.social_instagram || '#', label: 'Instagram' },
    { icon: FaTwitter, url: settings.social_twitter || '#', label: 'Twitter' },
    { icon: FaFacebookF, url: settings.social_facebook || '#', label: 'Facebook' },
    { icon: FaTiktok, url: settings.social_tiktok || '#', label: 'TikTok' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <div className="card-dark p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('contact.getInTouch')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className="input-dark"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="input-dark"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className="input-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('contact.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t('contact.subjectPlaceholder')}
                      className="input-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    {t('contact.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={5}
                    className="input-dark resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon w-full flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <span className="loader w-5 h-5 mr-2" />
                      {t('common.sending')}
                    </>
                  ) : (
                    t('contact.sendMessage')
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-left">
            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('contact.contactInfo')}
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-white hover:text-primary-500 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="card-dark p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('contact.followUs')}
              </h2>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              {settings.contact_whatsapp && (
                <a
                  href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="font-semibold">Chat via WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
