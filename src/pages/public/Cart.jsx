import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlinePlus, HiOutlineMinus, HiOutlineTrash, HiOutlineArrowLeft, HiOutlineTag, HiOutlineTruck } from 'react-icons/hi'
import { useCart } from '@context/CartContext'
import Breadcrumbs from '@components/common/Breadcrumbs'
import toast from 'react-hot-toast'

export default function Cart() {
  const { t, i18n } = useTranslation()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [shippingOption, setShippingOption] = useState('regular')
  const lang = i18n.language

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shippingOptions = [
    { id: 'regular', name: lang === 'id' ? 'Regular (3-5 hari)' : 'Regular (3-5 days)', price: 25000 },
    { id: 'express', name: lang === 'id' ? 'Express (1-2 hari)' : 'Express (1-2 days)', price: 45000 },
    { id: 'same-day', name: lang === 'id' ? 'Same Day (Hari ini)' : 'Same Day (Today)', price: 75000 }
  ]

  const applyCoupon = () => {
    const validCoupons = {
      'WELCOME10': 0.1,
      'ZENITH20': 0.2,
      'VIP30': 0.3
    }
    
    if (validCoupons[couponCode.toUpperCase()]) {
      const discountPercent = validCoupons[couponCode.toUpperCase()]
      setDiscount(getTotal() * discountPercent)
      toast.success(lang === 'id' ? `Kupon berhasil! Diskon ${discountPercent * 100}%` : `Coupon applied! ${discountPercent * 100}% off`)
    } else if (couponCode) {
      toast.error(lang === 'id' ? 'Kode kupon tidak valid' : 'Invalid coupon code')
    }
  }

  const selectedShipping = shippingOptions.find(opt => opt.id === shippingOption)
  const shipping = getTotal() >= 500000 ? 0 : (selectedShipping?.price || 25000)
  const subtotal = getTotal()
  const grandTotal = subtotal - discount + shipping

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
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
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
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>{lang === 'id' ? 'Diskon' : 'Discount'}</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                
                {/* Shipping Options */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t('cart.shipping')}</span>
                    {shipping === 0 && (
                      <span className="text-green-500 text-sm font-medium">{t('cart.freeShipping')}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          shippingOption === option.id
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-dark-700 hover:border-dark-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={shippingOption === option.id}
                            onChange={() => setShippingOption(option.id)}
                            className="text-primary-500"
                          />
                          <div>
                            <div className="text-white text-sm font-medium">{option.name}</div>
                            {getTotal() >= 500000 && (
                              <div className="text-green-500 text-xs">{lang === 'id' ? 'Gratis!' : 'Free!'}</div>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${getTotal() >= 500000 ? 'line-through text-gray-500' : 'text-white'}`}>
                          {formatPrice(option.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {lang === 'id'
                        ? `Belanja ${formatPrice(500000 - getTotal())} lagi untuk gratis ongkir!`
                        : `Shop ${formatPrice(500000 - getTotal())} more for free shipping!`}
                    </p>
                  )}
                </div>
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
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <HiOutlineTag className="w-4 h-4" />
                  {lang === 'id' ? 'Punya kode kupon?' : 'Have a coupon code?'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder={lang === 'id' ? 'Masukkan kode kupon' : 'Enter coupon code'}
                    className="input-dark flex-1 uppercase"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-primary-500 hover:text-dark-900 transition-colors font-medium"
                  >
                    {lang === 'id' ? 'Pakai' : 'Apply'}
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {lang === 'id' ? 'Kupon berhasil diterapkan!' : 'Coupon applied successfully!'}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {lang === 'id' ? 'Coba: WELCOME10, ZENITH20, VIP30' : 'Try: WELCOME10, ZENITH20, VIP30'}
                </p>
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
