import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineShoppingBag, HiOutlineEye, HiOutlineSparkles } from 'react-icons/hi'
import { useCart } from '@context/CartContext'
import OptimizedImage, { getOptimizedUrl } from '@components/common/OptimizedImage'

function ProductCard({ product, index = 0 }) {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const lang = i18n.language

  const name = lang === 'id' ? product.name_id : product.name_en
  const shortDesc = lang === 'id' ? product.short_description_id : product.short_description_en
  
  const primaryImage = useMemo(() => {
    const imgUrl = product.images?.find(img => img.is_primary)?.image_url 
      || product.images?.[0]?.image_url 
      || '/images/placeholder.jpg'
    return getOptimizedUrl(imgUrl, { width: 500, quality: 80 })
  }, [product.images])

  const formatPrice = useMemo(() => (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }, [])

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1, 'M', null) // Default to size M
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="card-dark overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-dark-900">
            <OptimizedImage
              src={primaryImage}
              alt={name}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.is_featured && (
                <div className="relative group/badge">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-500 text-black text-xs font-bold uppercase rounded flex items-center gap-1 shadow-lg">
                    <HiOutlineSparkles className="w-3 h-3" />
                    {lang === 'id' ? 'Display Eksklusif' : 'Display Only'}
                  </span>
                  {/* Tooltip */}
                  {product.showcase_badge && (
                    <div className="absolute left-0 top-full mt-2 w-56 p-3 bg-dark-800 border border-primary-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-300 z-20">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {lang === 'id' ? product.showcase_badge.text_id : product.showcase_badge.text_en}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {product.is_new && !product.is_featured && (
                <span className="px-3 py-1 bg-primary-500 text-black text-xs font-bold uppercase rounded">
                  {t('home.newArrivals').split(' ')[0]}
                </span>
              )}
              {product.compare_price && !product.is_featured && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded">
                  Sale
                </span>
              )}
              {product.is_bestseller && !product.is_featured && (
                <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold uppercase rounded">
                  Best
                </span>
              )}
            </div>
            
            {/* Stock Badge - Top Right */}
            <div className="absolute top-4 right-4 z-10">
              {product.quantity <= 0 ? (
                <span className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase rounded-full">
                  {t('products.outOfStock') || 'Out of Stock'}
                </span>
              ) : product.quantity <= 10 && (
                <span className="px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold uppercase rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {product.quantity} left
                </span>
              )}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              {!product.is_featured && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQuickAdd}
                  className="w-12 h-12 rounded-full bg-primary-500 text-black flex items-center justify-center shadow-lg"
                  title={t('products.addToCart')}
                >
                  <HiOutlineShoppingBag className="w-5 h-5" />
                </motion.button>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
              >
                <HiOutlineEye className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Neon Border Effect on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 transition-colors duration-300 pointer-events-none" 
              style={{ boxShadow: 'inset 0 0 20px transparent' }}
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-semibold text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2">
              {name}
            </h3>
            
            {shortDesc && (
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {shortDesc}
              </p>
            )}

            <div className="flex items-center justify-between">
              {product.is_featured ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <HiOutlineSparkles className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium">
                    {lang === 'id' ? 'Display Eksklusif - Tidak Dijual' : 'Display Only - Not for Sale'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-500">
                      {formatPrice(product.price)}
                    </span>
                    {product.compare_price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.compare_price)}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Status */}
                  {product.quantity <= 0 ? (
                    <span className="text-xs text-red-500 font-medium">
                      {t('products.outOfStock')}
                    </span>
                  ) : product.quantity <= product.low_stock_threshold ? (
                    <span className="text-xs text-yellow-500 font-medium">
                      {t('products.lowStock')}
                    </span>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(ProductCard)
