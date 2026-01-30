import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa'
import { useTheme } from '@context/ThemeContext'

export default function Footer() {
  const { t } = useTranslation()
  const { settings } = useTheme()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ]

  const customerLinks = [
    { path: '/faq', label: t('nav.faq') },
    { path: '#', label: t('footer.sizeGuide') },
    { path: '#', label: t('footer.shippingPolicy') },
    { path: '#', label: t('footer.returnPolicy') },
  ]

  const socialLinks = [
    { icon: FaInstagram, url: settings.social_instagram || '#', label: 'Instagram' },
    { icon: FaTwitter, url: settings.social_twitter || '#', label: 'Twitter' },
    { icon: FaFacebookF, url: settings.social_facebook || '#', label: 'Facebook' },
    { icon: FaTiktok, url: settings.social_tiktok || '#', label: 'TikTok' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/images/logo.jpg" 
                alt="Zenith.ra" 
                className="h-14 w-auto rounded-lg border border-primary-500/30 shadow-[0_0_15px_rgba(57,255,20,0.3)]"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={`mailto:${settings.contact_email || 'hello@zenith-ra.com'}`}
                className="flex items-center text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaEnvelope className="w-4 h-4 mr-3" />
                <span className="text-sm">{settings.contact_email || 'hello@zenith-ra.com'}</span>
              </a>
              <a 
                href={`tel:${settings.contact_phone || '+62 812 3456 7890'}`}
                className="flex items-center text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaPhone className="w-4 h-4 mr-3" />
                <span className="text-sm">{settings.contact_phone || '+62 812 3456 7890'}</span>
              </a>
              <div className="flex items-start text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 mr-3 mt-1" />
                <span className="text-sm">{settings.contact_address || 'Jakarta, Indonesia'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t('footer.customerService')}
            </h3>
            <ul className="space-y-3">
              {customerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t('footer.followUs')}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {t('footer.newsletterDesc')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* WhatsApp Button */}
            {settings.contact_whatsapp && (
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center space-x-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="font-medium">WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} {settings.site_name || 'Zenith.ra'}. {t('footer.copyright').split('©')[1] || 'All rights reserved.'}
            </p>
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
