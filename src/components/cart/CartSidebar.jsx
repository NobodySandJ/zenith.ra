import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX, HiOutlinePlus, HiOutlineMinus, HiOutlineTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useCart } from '@context/CartContext'

export default function CartSidebar() {
  const { t, i18n } = useTranslation()
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotal } = useCart()
  const lang = i18n.language

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-dark-900 border-l border-dark-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-700">
              <h2 className="text-xl font-bold text-white">
                {t('cart.title')}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-dark-800 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 mb-4">{t('cart.emptyCart')}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-outline-neon text-sm"
                  >
                    {t('cart.continueShopping')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-dark-800 rounded-lg border border-dark-700"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-900 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={lang === 'id' ? item.name_id : item.name_en}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-medium text-white hover:text-primary-500 transition-colors line-clamp-1"
                        >
                          {lang === 'id' ? item.name_id : item.name_en}
                        </Link>
                        
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>• {item.selectedColor}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-dark-600 rounded-lg">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                            >
                              <HiOutlineMinus className="w-4 h-4" />
                            </button>
                            <span className="px-3 text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                              <HiOutlinePlus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-semibold text-primary-500">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors self-start"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-dark-700 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-xl font-bold text-white">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {getTotal() >= 500000 && (
                  <p className="text-sm text-green-500 text-center">
                    ✓ {t('cart.freeShipping')}
                  </p>
                )}

                {/* Checkout Button */}
                <button className="btn-neon w-full text-center">
                  {t('cart.checkout')}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
