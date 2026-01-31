import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineChevronLeft,
  HiOutlineCheck,
  HiOutlineSparkles
} from 'react-icons/hi'
import { useCart } from '@context/CartContext'
import ProductCard from '@components/products/ProductCard'
import Breadcrumbs from '@components/common/Breadcrumbs'
import { ProductDetailSkeleton, ProductGridSkeleton } from '@components/common/Skeleton'
import toast from 'react-hot-toast'

// Dummy product data
const dummyProduct = {
  id: '1',
  name_en: 'Dr. Doom Neon Tee',
  name_id: 'Kaos Dr. Doom Neon',
  slug: 'dr-doom-neon-tee',
  description_en: 'Limited edition collaboration featuring the iconic Dr. Doom design with neon green accents. Premium 250 GSM cotton with glow-in-the-dark print technology. This exclusive piece represents the fusion of streetwear culture and comic book iconography.',
  description_id: 'Edisi terbatas kolaborasi menampilkan desain ikonik Dr. Doom dengan aksen neon hijau. Katun premium 250 GSM dengan teknologi cetak glow-in-the-dark. Karya eksklusif ini merepresentasikan fusi budaya streetwear dan ikonografi komik.',
  short_description_en: 'Limited edition Dr. Doom collaboration with neon green glow-in-the-dark print',
  short_description_id: 'Edisi terbatas kolaborasi Dr. Doom dengan cetak neon hijau glow-in-the-dark',
  price: 450000,
  compare_price: 550000,
  sku: 'ZR-DOOM-001',
  is_new: true,
  is_featured: true,
  quantity: 100,
  // Showcase exclusive fields
  showcase_highlight_en: {
    title: 'Exclusive Marvel Collaboration',
    subtitle: 'Limited Edition x Marvel Studios',
    description: 'An extraordinary collaboration between Zenith.ra and Marvel Studios, celebrating the iconic Dr. Doom character. This exclusive piece features revolutionary glow-in-the-dark technology and premium materials.',
    features: [
      { icon: '🎨', title: 'Official Marvel License', description: 'Authentic collaboration with Marvel Studios' },
      { icon: '✨', title: 'Glow Technology', description: 'Advanced glow-in-the-dark print that lasts 8+ hours' },
      { icon: '👕', title: 'Premium 250 GSM', description: 'Ultra-soft heavyweight cotton for superior quality' },
      { icon: '🎭', title: 'Limited Production', description: 'Only 500 pieces worldwide - Display model' }
    ]
  },
  showcase_highlight_id: {
    title: 'Kolaborasi Eksklusif Marvel',
    subtitle: 'Edisi Terbatas x Marvel Studios',
    description: 'Kolaborasi luar biasa antara Zenith.ra dan Marvel Studios, merayakan karakter ikonik Dr. Doom. Karya eksklusif ini menampilkan teknologi glow-in-the-dark revolusioner dan material premium.',
    features: [
      { icon: '🎨', title: 'Lisensi Resmi Marvel', description: 'Kolaborasi autentik dengan Marvel Studios' },
      { icon: '✨', title: 'Teknologi Glow', description: 'Cetak glow-in-the-dark canggih yang bertahan 8+ jam' },
      { icon: '👕', title: 'Premium 250 GSM', description: 'Katun heavyweight ultra-lembut untuk kualitas superior' },
      { icon: '🎭', title: 'Produksi Terbatas', description: 'Hanya 500 pieces di seluruh dunia - Model display' }
    ]
  },
  images: [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', is_primary: true },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', is_primary: false },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800', is_primary: false },
  ],
  sizes: [
    { size: 'S', quantity: 15 },
    { size: 'M', quantity: 25 },
    { size: 'L', quantity: 30 },
    { size: 'XL', quantity: 20 },
    { size: 'XXL', quantity: 10 },
  ],
  colors: [
    { color_name_en: 'Phantom Black', color_name_id: 'Hitam Phantom', color_code: '#0a0a0a', quantity: 70 },
    { color_name_en: 'Doom Green', color_name_id: 'Hijau Doom', color_code: '#1a2f1a', quantity: 30 },
  ],
  category: {
    name_en: 'Collaboration',
    name_id: 'Kolaborasi',
    slug: 'collaboration'
  }
}

const relatedProducts = [
  {
    id: '2',
    name_en: 'Cyber Pulse Oversized Tee',
    name_id: 'Kaos Oversized Cyber Pulse',
    slug: 'cyber-pulse-tee',
    price: 350000,
    is_bestseller: true,
    quantity: 150,
    images: [{ image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', is_primary: true }]
  },
  {
    id: '3',
    name_en: 'Zenith Core Basic Tee',
    name_id: 'Kaos Basic Zenith Core',
    slug: 'zenith-core-basic',
    price: 250000,
    is_bestseller: true,
    quantity: 200,
    images: [{ image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500', is_primary: true }]
  },
  {
    id: '4',
    name_en: 'Neon Grid Premium Tee',
    name_id: 'Kaos Premium Neon Grid',
    slug: 'neon-grid-premium',
    price: 420000,
    compare_price: 500000,
    is_new: true,
    quantity: 80,
    images: [{ image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500', is_primary: true }]
  },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const [product] = useState(dummyProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const lang = i18n.language

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [slug])

  const name = lang === 'id' ? product.name_id : product.name_en
  const description = lang === 'id' ? product.description_id : product.description_en
  const categoryName = lang === 'id' ? product.category?.name_id : product.category?.name_en

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error(t('products.selectSize') || 'Please select a size')
      return
    }
    
    setAddingToCart(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const colorName = selectedColor 
      ? (lang === 'id' ? product.colors.find(c => c.color_code === selectedColor)?.color_name_id : product.colors.find(c => c.color_code === selectedColor)?.color_name_en)
      : null
    addItem(product, quantity, selectedSize, colorName)
    
    setAddingToCart(false)
    toast.success(t('cart.addedToCart') || 'Added to cart!')
  }

  const discount = product.compare_price 
    ? Math.round((1 - product.price / product.compare_price) * 100)
    : null

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Breadcrumb */}
        <nav className="mb-8" data-aos="fade-down">
          <Link 
            to="/products" 
            className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-colors"
          >
            <HiOutlineChevronLeft className="w-5 h-5 mr-1" />
            {t('products.allProducts')}
          </Link>
        </nav>

        {loading ? (
          <ProductDetailSkeleton />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div data-aos="fade-right">
            {/* Main Image */}
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 mb-4 cursor-zoom-in group"
              onClick={() => setIsZoomed(true)}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]?.image_url}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Zoom Icon Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-gold-metallic via-silver-metallic to-gold-metallic text-black text-sm font-bold uppercase rounded flex items-center gap-1.5 shadow-lg animate-gradient bg-[length:200%_auto]">
                    <HiOutlineSparkles className="w-4 h-4" />
                    {lang === 'id' ? 'Display Eksklusif' : 'Display Only'}
                  </span>
                )}
                {product.is_new && !product.is_featured && (
                  <span className="px-3 py-1 bg-primary-500 text-black text-sm font-bold uppercase rounded">
                    New
                  </span>
                )}
                {discount && !product.is_featured && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold uppercase rounded">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary-500' 
                      : 'border-transparent hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div data-aos="fade-left">
            {/* Category */}
            <Link 
              to={`/products?category=${product.category?.slug}`}
              className="text-primary-500 text-sm font-medium uppercase tracking-wider hover:underline"
            >
              {categoryName}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              {name}
            </h1>

            {/* Price & Stock */}
            {product.is_featured ? (
              <div className="mb-6 p-6 bg-gradient-to-br from-gold-900/20 via-silver-900/20 to-gold-900/20 border-2 border-transparent rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 via-silver-500/20 to-gold-500/20 animate-gradient bg-[length:200%_auto]"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <HiOutlineSparkles className="w-6 h-6 text-gold-metallic drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-silver-chrome via-gold-metallic to-silver-chrome">
                      {lang === 'id' ? 'Produk Display Eksklusif' : 'Exclusive Display Product'}
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    {lang === 'id' 
                      ? 'Produk ini ditampilkan untuk tujuan promosi dan tidak tersedia untuk pembelian regular.'
                      : 'This product is displayed for promotional purposes and is not available for regular purchase.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.compare_price && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.compare_price)}
                    </span>
                  )}
                </div>
                
                {/* Stock Badge */}
                <div className="flex items-center gap-2">
                  {product.quantity > 0 ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 text-sm font-medium rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {product.quantity < 10 ? `Only ${product.quantity} left` : 'In Stock'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 text-sm font-medium rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-400 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Showcase Highlight - Only for featured products */}
            {product.is_featured && product.showcase_highlight_en && (
              <div className="mb-8 p-6 bg-gradient-to-br from-gold-900/10 via-dark-800 to-silver-900/10 border-2 border-transparent rounded-2xl backdrop-blur-sm relative overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-silver-500/10 to-gold-500/10 animate-gradient bg-[length:200%_auto]"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-gold-metallic to-silver-metallic rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                    <div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-metallic via-silver-chrome to-gold-metallic">
                        {lang === 'id' ? product.showcase_highlight_id.title : product.showcase_highlight_en.title}
                      </h3>
                      <p className="text-sm text-gold-400 font-medium">
                        {lang === 'id' ? product.showcase_highlight_id.subtitle : product.showcase_highlight_en.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {lang === 'id' ? product.showcase_highlight_id.description : product.showcase_highlight_en.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(lang === 'id' ? product.showcase_highlight_id.features : product.showcase_highlight_en.features).map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-dark-800/50 rounded-xl border border-gold-900/30 hover:border-gold-500/50 transition-colors"
                      >
                        <span className="text-2xl">{feature.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
                          <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* For featured products, show only view-only message */}
            {product.is_featured ? (
              <div className="space-y-4">
                <div className="p-4 bg-dark-800 border border-dark-700 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <HiOutlineEye className="w-5 h-5" />
                    <span className="font-medium">
                      {lang === 'id' ? 'Hanya untuk Display' : 'Display Only'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {lang === 'id'
                      ? 'Produk ini merupakan bagian dari koleksi showcase eksklusif kami dan tidak tersedia untuk pembelian online saat ini.'
                      : 'This product is part of our exclusive showcase collection and is not available for online purchase at this time.'}
                  </p>
                </div>
                
                {/* Share button only for featured products */}
                <div className="flex gap-4">
                  <button className="flex-1 p-4 border-2 border-dark-600 rounded-lg text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all flex items-center justify-center gap-2">
                    <HiOutlineShare className="w-5 h-5" />
                    {lang === 'id' ? 'Bagikan' : 'Share'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Size Selection */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    {t('products.size')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size.size)}
                        disabled={size.quantity === 0}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size.size
                            ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                            : size.quantity === 0
                            ? 'border-dark-700 text-dark-500 cursor-not-allowed'
                            : 'border-dark-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    {t('products.color')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.color_code}
                        onClick={() => setSelectedColor(color.color_code)}
                        disabled={color.quantity === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color.color_code
                            ? 'border-primary-500'
                            : color.quantity === 0
                            ? 'border-dark-700 opacity-50 cursor-not-allowed'
                            : 'border-dark-600 hover:border-gray-500'
                        }`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full border border-gray-600"
                          style={{ backgroundColor: color.color_code }}
                        />
                        <span className="text-gray-300">
                          {lang === 'id' ? color.color_name_id : color.color_name_en}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="block text-white font-medium mb-3">
                    {t('products.quantity')}
                  </label>
                  <div className="flex items-center border border-dark-600 rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <HiOutlineMinus className="w-5 h-5" />
                    </button>
                    <span className="px-6 text-white font-medium text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <HiOutlinePlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="btn-neon flex-1 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {addingToCart ? (
                      <>
                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <HiOutlineShoppingBag className="w-5 h-5" />
                        {t('products.addToCart')}
                      </>
                    )}
                  </button>
                  <button className="p-4 border-2 border-dark-600 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                    <HiOutlineHeart className="w-6 h-6" />
                  </button>
                  <button className="p-4 border-2 border-dark-600 rounded-lg text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all">
                    <HiOutlineShare className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}

            {/* Product Info */}
            <div className="border-t border-dark-700 pt-6 space-y-3">
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">{t('products.sku')}:</span>
                <span className="text-gray-300">{product.sku}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">{t('products.category')}:</span>
                <Link 
                  to={`/products?category=${product.category?.slug}`}
                  className="text-primary-500 hover:underline"
                >
                  {categoryName}
                </Link>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">Stock:</span>
                <span className={product.quantity > 10 ? 'text-green-500' : 'text-yellow-500'}>
                  {product.quantity > 10 ? t('products.inStock') : t('products.lowStock')} ({product.quantity})
                </span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
              
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={product.images[selectedImage]?.image_url}
                alt={name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <HiOutlineChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {selectedImage + 1} / {product.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8" data-aos="fade-up">
            {t('products.relatedProducts')}
          </h2>
          {loading ? (
            <ProductGridSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
