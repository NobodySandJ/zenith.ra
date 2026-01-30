import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineChevronLeft,
  HiOutlineCheck
} from 'react-icons/hi'
import { useCart } from '@context/CartContext'
import ProductCard from '@components/products/ProductCard'
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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 mb-4">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]?.image_url}
                alt={name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && (
                  <span className="px-3 py-1 bg-primary-500 text-black text-sm font-bold uppercase rounded">
                    New
                  </span>
                )}
                {discount && (
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

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-500">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-8 leading-relaxed">
              {description}
            </p>

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
