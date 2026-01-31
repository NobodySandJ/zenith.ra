import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'
import ProductCard from '@components/products/ProductCard'
import Breadcrumbs from '@components/common/Breadcrumbs'
import { ProductGridSkeleton, CategorySidebarSkeleton } from '@components/common/Skeleton'

// Dummy data
const dummyProducts = [
  {
    id: '1',
    name_en: 'Dr. Doom Neon Tee',
    name_id: 'Kaos Dr. Doom Neon',
    slug: 'dr-doom-neon-tee',
    short_description_en: 'Limited edition Dr. Doom collaboration with neon green glow-in-the-dark print',
    short_description_id: 'Edisi terbatas kolaborasi Dr. Doom dengan cetak neon hijau glow-in-the-dark',
    price: 450000,
    compare_price: 550000,
    is_new: true,
    is_featured: true,
    quantity: 100,
    category_id: 'collab',
    images: [{ image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', is_primary: true }],
    showcase_badge: {
      text_en: '🎨 Official Marvel collaboration - Limited to 500 pieces worldwide',
      text_id: '🎨 Kolaborasi resmi Marvel - Terbatas 500 pieces di seluruh dunia'
    }
  },
  {
    id: '2',
    name_en: 'Cyber Pulse Oversized Tee',
    name_id: 'Kaos Oversized Cyber Pulse',
    slug: 'cyber-pulse-tee',
    short_description_en: 'Futuristic oversized tee with reflective pulse wave design',
    short_description_id: 'Kaos oversized futuristik dengan desain gelombang pulse reflektif',
    price: 350000,
    is_bestseller: true,
    quantity: 150,
    category_id: 'best',
    images: [{ image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', is_primary: true }]
  },
  {
    id: '3',
    name_en: 'Zenith Core Basic Tee',
    name_id: 'Kaos Basic Zenith Core',
    slug: 'zenith-core-basic',
    short_description_en: 'Essential everyday tee with iconic Zenith.ra logo',
    short_description_id: 'Kaos esensial sehari-hari dengan logo ikonik Zenith.ra',
    price: 250000,
    is_bestseller: true,
    quantity: 200,
    category_id: 'basic',
    images: [{ image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500', is_primary: true }]
  },
  {
    id: '4',
    name_en: 'Neon Grid Premium Tee',
    name_id: 'Kaos Premium Neon Grid',
    slug: 'neon-grid-premium',
    short_description_en: 'Premium tee with geometric neon grid UV-reactive print',
    short_description_id: 'Kaos premium dengan cetak grid geometris neon UV-reaktif',
    price: 420000,
    compare_price: 500000,
    is_new: true,
    is_featured: true,
    quantity: 80,
    category_id: 'premium',
    images: [{ image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500', is_primary: true }],
    showcase_badge: {
      text_en: '⚡ Revolutionary UV-reactive technology - Event exclusive display',
      text_id: '⚡ Teknologi UV-reaktif revolusioner - Display eksklusif event'
    }
  },
  {
    id: '5',
    name_en: 'Future Vision Tee',
    name_id: 'Kaos Future Vision',
    slug: 'future-vision-tee',
    short_description_en: 'New arrival with holographic-style innovative print',
    short_description_id: 'Produk baru dengan cetak inovatif bergaya holografik',
    price: 380000,
    is_new: true,
    quantity: 120,
    category_id: 'new',
    images: [{ image_url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500', is_primary: true }]
  },
  {
    id: '6',
    name_en: 'Glitch Effect Tee',
    name_id: 'Kaos Glitch Effect',
    slug: 'glitch-effect-tee',
    short_description_en: 'Digital glitch-inspired design with distorted print effect',
    short_description_id: 'Desain terinspirasi glitch digital dengan efek cetak terdistorsi',
    price: 320000,
    quantity: 90,
    category_id: 'best',
    images: [{ image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', is_primary: true }]
  },
  {
    id: '7',
    name_en: 'Minimal Zenith Tee',
    name_id: 'Kaos Minimal Zenith',
    slug: 'minimal-zenith-tee',
    short_description_en: 'Clean minimalist design with subtle Zenith branding',
    short_description_id: 'Desain minimalis bersih dengan branding Zenith yang halus',
    price: 280000,
    quantity: 180,
    category_id: 'basic',
    images: [{ image_url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500', is_primary: true }]
  },
  {
    id: '8',
    name_en: 'Collab Series V2 Tee',
    name_id: 'Kaos Collab Series V2',
    slug: 'collab-series-v2',
    short_description_en: 'Limited edition collaboration - only 200 pieces worldwide',
    short_description_id: 'Edisi terbatas kolaborasi - hanya 200 piece di seluruh dunia',
    price: 550000,
    compare_price: 650000,
    is_featured: true,
    quantity: 50,
    category_id: 'limited',
    images: [{ image_url: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500', is_primary: true }]
  },
]

const dummyCategories = [
  { id: 'all', name_en: 'All Products', name_id: 'Semua Produk', slug: 'all' },
  { id: 'new', name_en: 'New Arrivals', name_id: 'Produk Baru', slug: 'new-arrivals' },
  { id: 'best', name_en: 'Best Sellers', name_id: 'Terlaris', slug: 'best-sellers' },
  { id: 'limited', name_en: 'Limited Edition', name_id: 'Edisi Terbatas', slug: 'limited-edition' },
  { id: 'collab', name_en: 'Collaboration', name_id: 'Kolaborasi', slug: 'collaboration' },
  { id: 'basic', name_en: 'Basic Collection', name_id: 'Koleksi Basic', slug: 'basic' },
  { id: 'premium', name_en: 'Premium Collection', name_id: 'Koleksi Premium', slug: 'premium' },
]

export default function Products() {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState([])
  const [categories] = useState(dummyCategories)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const lang = i18n.language

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [activeCategory, searchQuery, sortBy])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...dummyProducts]

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === activeCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name_en.toLowerCase().includes(query) ||
        p.name_id.toLowerCase().includes(query)
      )
    }

    // Filter by price range
    const min = minPrice ? parseInt(minPrice) : 0
    const max = maxPrice ? parseInt(maxPrice) : Infinity
    filtered = filtered.filter(p => p.price >= min && p.price <= max)

    // Sort
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
        break
      case 'popular':
        filtered.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0))
        break
      default:
        break
    }

    setProducts(filtered)
  }, [activeCategory, searchQuery, sortBy, minPrice, maxPrice])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('products.title')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8" data-aos="fade-up">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className="w-full h-12 pl-12 pr-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 px-4 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-all w-full lg:w-48 cursor-pointer"
          >
            <option value="newest">{t('products.newest')}</option>
            <option value="popular">{t('products.popular')}</option>
            <option value="price_asc">{t('products.priceLowest')}</option>
            <option value="price_desc">{t('products.priceHighest')}</option>
          </select>

          {/* View Mode Toggle - Desktop */}
          <div className="hidden lg:flex items-center border border-dark-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-500' : 'text-gray-400 hover:text-white'}`}
            >
              <HiOutlineViewGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-all ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-500' : 'text-gray-400 hover:text-white'}`}
            >
              <HiOutlineViewList className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 h-12 px-4 bg-dark-800 border border-dark-700 rounded-lg text-white"
          >
            <HiOutlineAdjustments className="w-5 h-5" />
            {t('common.filter')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <aside 
            className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
            data-aos="fade-right"
          >
            <div className="card-dark p-6 sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-white mb-4">
                  {t('products.categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-primary-500/20 text-primary-500 border-l-2 border-primary-500'
                          : 'text-gray-400 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      {lang === 'id' ? category.name_id : category.name_en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-6 border-t border-dark-700">
                <h3 className="font-semibold text-white mb-4">
                  {lang === 'id' ? 'Rentang Harga' : 'Price Range'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-500 text-sm mb-1 block">
                      {lang === 'id' ? 'Harga Minimum' : 'Min Price'}
                    </label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm mb-1 block">
                      {lang === 'id' ? 'Harga Maksimum' : 'Max Price'}
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="1000000"
                      className="w-full h-10 px-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  {(minPrice || maxPrice) && (
                    <button
                      onClick={() => {
                        setMinPrice('')
                        setMaxPrice('')
                      }}
                      className="text-primary-500 text-sm hover:underline"
                    >
                      {lang === 'id' ? 'Reset Filter' : 'Reset Filter'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
                  <HiOutlineSearch className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg mb-2">{t('products.noProducts')}</p>
                <p className="text-gray-600 text-sm">Try adjusting your search or filter</p>
              </motion.div>
            ) : (
              <>
                {/* Results count */}
                <p className="text-gray-500 text-sm mb-4">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                </p>
                
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
