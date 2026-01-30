import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCollection,
  HiOutlinePhotograph,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineGlobeAlt
} from 'react-icons/hi'
import { useAuth } from '@context/AuthContext'
import { useTheme } from '@context/ThemeContext'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const { settings } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const menuItems = [
    { path: '/admin', icon: HiOutlineHome, label: t('admin.dashboard'), exact: true },
    { path: '/admin/products', icon: HiOutlineShoppingBag, label: t('admin.products') },
    { path: '/admin/categories', icon: HiOutlineCollection, label: t('admin.categories') },
    { path: '/admin/banners', icon: HiOutlinePhotograph, label: t('admin.banners') },
    { path: '/admin/pages', icon: HiOutlineDocumentText, label: t('admin.pages') },
    { path: '/admin/settings', icon: HiOutlineCog, label: t('admin.settings') },
  ]

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <Link to="/admin" className="flex items-center space-x-3">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="Zenith.ra" className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-display font-bold text-neon tracking-wider">
              ZENITH.RA
            </span>
          )}
          {sidebarOpen && (
            <span className="text-xs text-gray-500 uppercase tracking-wider">Admin</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path, item.exact)
                ? 'bg-primary-500/20 text-primary-500 border-l-2 border-primary-500'
                : 'text-gray-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-dark-700">
        <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} mb-4`}>
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
            <span className="text-primary-500 font-bold">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user?.name}</p>
              <p className="text-gray-500 text-sm truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} w-full px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200`}
        >
          <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">{t('admin.logout')}</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-dark-900 border-r border-dark-700 transition-all duration-300 fixed top-0 left-0 h-screen z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-64 bg-dark-900 border-r border-dark-700 z-50 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Bar */}
        <header className="h-16 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700"
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700"
            >
              {sidebarOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>

            <h1 className="text-lg font-semibold text-white">
              {t('admin.welcome')}, {user?.name?.split(' ')[0]}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
            >
              <HiOutlineGlobeAlt className="w-5 h-5" />
              <span className="text-sm font-medium uppercase">
                {i18n.language === 'en' ? 'ID' : 'EN'}
              </span>
            </button>

            {/* View Site */}
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-dark-600 rounded-lg hover:border-primary-500 transition-all"
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
