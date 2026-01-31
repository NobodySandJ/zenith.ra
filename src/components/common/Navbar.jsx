import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineMenu, 
  HiOutlineX, 
  HiOutlineShoppingBag,
  HiOutlineGlobeAlt 
} from 'react-icons/hi'
import { useCart } from '@context/CartContext'
import { useTheme } from '@context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { getItemCount, setIsOpen: setCartOpen } = useCart()
  const { settings } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/showcase', label: t('nav.showcase') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/faq', label: t('nav.faq') },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <img 
              src="/images/logo.jpg" 
              alt="Zenith.ra" 
              className="h-12 w-auto rounded-lg border border-primary-500/30 shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'text-neon' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                    style={{ boxShadow: '0 0 10px var(--color-neon-glow)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 min-h-[44px]"
              title={i18n.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <HiOutlineGlobeAlt className="w-6 h-6" />
              <span className="text-sm font-medium uppercase">
                {i18n.language === 'en' ? 'ID' : 'EN'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <HiOutlineShoppingBag className="w-7 h-7" />
              {getItemCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-primary-500 text-black text-xs font-bold rounded-full flex items-center justify-center"
                  style={{ boxShadow: '0 0 10px var(--color-neon-glow)' }}
                >
                  {getItemCount()}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiOutlineX className="w-7 h-7" />
              ) : (
                <HiOutlineMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark-900/95 backdrop-blur-lg border-t border-dark-700"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 px-4 rounded-lg font-medium text-base uppercase tracking-wider transition-all duration-300 min-h-[44px] flex items-center ${
                      isActive(link.path)
                        ? 'text-neon bg-white/5 border-l-2 border-primary-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
