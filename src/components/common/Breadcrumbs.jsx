import { Link, useLocation } from 'react-router-dom'
import { HiOutlineHome, HiOutlineChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

export default function Breadcrumbs() {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  
  // Split path into segments
  const pathSegments = location.pathname.split('/').filter(segment => segment)
  
  // Skip breadcrumbs on home page
  if (pathSegments.length === 0) return null

  // Map route segments to readable labels
  const getLabel = (segment, index) => {
    // Check if it's a dynamic segment (like product slug)
    if (index > 0 && pathSegments[index - 1] === 'products') {
      return segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }

    // Static route labels
    const labelMap = {
      'products': t('nav.products') || 'Products',
      'about': t('nav.about') || 'About',
      'contact': t('nav.contact') || 'Contact',
      'faq': t('nav.faq') || 'FAQ',
      'cart': t('nav.cart') || 'Cart',
      'admin': 'Admin',
      'dashboard': 'Dashboard',
      'categories': 'Categories',
      'banners': 'Banners',
      'settings': 'Settings',
      'pages': 'Pages'
    }

    return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  // Build breadcrumb path
  const buildPath = (index) => {
    return '/' + pathSegments.slice(0, index + 1).join('/')
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 overflow-x-auto">
      {/* Home */}
      <Link 
        to="/" 
        className="flex items-center text-gray-500 hover:text-primary-500 transition-colors flex-shrink-0"
      >
        <HiOutlineHome className="w-4 h-4" />
      </Link>

      {/* Separator */}
      <HiOutlineChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />

      {/* Path segments */}
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1
        const path = buildPath(index)
        const label = getLabel(segment, index)

        return (
          <div key={index} className="flex items-center space-x-2 flex-shrink-0">
            {isLast ? (
              <span className="text-white font-medium">{label}</span>
            ) : (
              <>
                <Link 
                  to={path}
                  className="text-gray-500 hover:text-primary-500 transition-colors"
                >
                  {label}
                </Link>
                <HiOutlineChevronRight className="w-4 h-4 text-gray-600" />
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}
