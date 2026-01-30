import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlinePlus, HiOutlineMinus, HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi'
import { useCart } from '@context/CartContext'

export default function Cart() {
  const { t, i18n } = useTranslation()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const lang = i18n.language

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shipping = getTotal() >= 500000 ? 0 : 25000
  const grandTotal = getTotal() + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-dark-800 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{t('cart.emptyCart')}</h1>
          <p className="text-gray-500 mb-8">
            {lang === 'id' 
              ? 'Sepertinya keranjang belanja Anda masih kosong.'
              : 'Looks like your shopping cart is still empty.'}
          </p>
          <Link to="/products" className="btn-neon">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-down">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t('cart.title')}
          </h1>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 transition-colors text-sm"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="card-dark p-6 flex gap-6"
              >
                {/* Image */}
                <Link 
                  to={`/products/${item.slug}`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-dark-900 flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={lang === 'id' ? item.name_id : item.name_en}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/products/${item.slug}`}
                    className="text-lg font-semibold text-white hover:text-primary-500 transition-colors"
                  >
                    {lang === 'id' ? item.name_id : item.name_en}
                  </Link>

                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && <span>• {item.selectedColor}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-dark-600 rounded-lg">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                      >
                        <HiOutlineMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-white font-medium">
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
                    <span className="text-xl font-bold text-primary-500">
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

            {/* Continue Shopping */}
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors mt-4"
            >
              <HiOutlineArrowLeft className="w-5 h-5" />
              {t('cart.continueShopping')}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="card-dark p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">
                {lang === 'id' ? 'Ringkasan Pesanan' : 'Order Summary'}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-white font-medium">{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('cart.shipping')}</span>
                  <span className="text-white font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-500">{t('cart.freeShipping')}</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-gray-500">
                    {lang === 'id'
                      ? `Gratis ongkir untuk pesanan di atas ${formatPrice(500000)}`
                      : `Free shipping for orders above ${formatPrice(500000)}`}
                  </p>
                )}
              </div>

              <div className="border-t border-dark-700 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-white">{t('cart.grandTotal')}</span>
                  <span className="text-2xl font-bold text-primary-500">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('cart.couponPlaceholder')}
                    className="input-dark flex-1"
                  />
                  <button className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors">
                    {t('cart.applyCoupon').split(' ')[0]}
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="btn-neon w-full text-center">
                {t('cart.checkout')}
              </button>

              {/* Payment Info */}
              <p className="text-center text-gray-500 text-sm mt-4">
                {lang === 'id'
                  ? 'Pembayaran aman & terpercaya'
                  : 'Secure & trusted payment'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
