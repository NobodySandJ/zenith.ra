import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineShoppingBag, HiOutlineEye } from 'react-icons/hi'
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
              {product.is_new && (
                <span className="px-3 py-1 bg-primary-500 text-black text-xs font-bold uppercase rounded">
                  {t('home.newArrivals').split(' ')[0]}
                </span>
              )}
              {product.compare_price && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded">
                  Sale
                </span>
              )}
              {product.is_bestseller && (
                <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold uppercase rounded">
                  Best
                </span>
              )}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickAdd}
                className="w-12 h-12 rounded-full bg-primary-500 text-black flex items-center justify-center shadow-lg"
                title={t('products.addToCart')}
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
              </motion.button>
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(ProductCard)
