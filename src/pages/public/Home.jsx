import { useState, useEffect, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  HiOutlineArrowRight, 
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineStar
} from 'react-icons/hi'
import { useTheme } from '@context/ThemeContext'
import ProductCard from '@components/products/ProductCard'
import LoadingScreen from '@components/common/LoadingScreen'
import { ProductGridSkeleton, TestimonialSkeleton } from '@components/common/Skeleton'

// Lazy load Three.js component
const HeroScene = lazy(() => import('@components/three/HeroScene'))

// Dummy data for products (will be replaced with Supabase data)
const dummyProducts = [
  {
    id: '1',
    name_en: 'Sovereign Dark Tee',
    name_id: 'Kaos Sovereign Dark',
    slug: 'sovereign-dark-tee',
    short_description_en: 'Limited edition dark aesthetic with neon green glow-in-the-dark print',
    short_description_id: 'Edisi terbatas estetik gelap dengan cetak neon hijau glow-in-the-dark',
    price: 450000,
    compare_price: 550000,
    is_new: true,
    is_featured: true,
    quantity: 100,
    images: [{ image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', is_primary: true }]
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
    images: [{ image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500', is_primary: true }]
  },
]

const dummyTestimonials = [
  {
    id: '1',
    customer_name: 'Andi Pratama',
    customer_location: 'Jakarta',
    rating: 5,
    content_en: 'Amazing quality! The neon print really glows in the dark. Best streetwear brand in Indonesia.',
    content_id: 'Kualitas luar biasa! Print neon benar-benar menyala dalam gelap. Brand streetwear terbaik di Indonesia.',
  },
  {
    id: '2',
    customer_name: 'Sarah Chen',
    customer_location: 'Singapore',
    rating: 5,
    content_en: 'Love the futuristic design. The cotton quality is premium and very comfortable.',
    content_id: 'Suka dengan desain futuristiknya. Kualitas katunnya premium dan sangat nyaman.',
  },
  {
    id: '3',
    customer_name: 'Budi Santoso',
    customer_location: 'Bandung',
    rating: 4,
    content_en: 'Great design and fast shipping. Will definitely buy more from Zenith.ra!',
    content_id: 'Desain bagus dan pengiriman cepat. Pasti akan beli lagi dari Zenith.ra!',
  },
]

export default function Home() {
  const { t, i18n } = useTranslation()
  const { settings } = useTheme()
  const [email, setEmail] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const lang = i18n.language

  // Simulate loading for products
  useEffect(() => {
    const timer1 = setTimeout(() => setProductsLoading(false), 1000)
    const timer2 = setTimeout(() => setTestimonialsLoading(false), 1200)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const features = [
    {
      icon: HiOutlineSparkles,
      title: t('home.premiumQuality'),
      description: t('home.premiumQualityDesc'),
    },
    {
      icon: HiOutlineLightningBolt,
      title: t('home.uniqueDesigns'),
      description: t('home.uniqueDesignsDesc'),
    },
    {
      icon: HiOutlineCube,
      title: t('home.limitedPieces'),
      description: t('home.limitedPiecesDesc'),
    },
    {
      icon: HiOutlineTruck,
      title: t('home.fastShipping'),
      description: t('home.fastShippingDesc'),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-dark-950 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/80 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary-500/10 border border-primary-500/30 rounded-full"
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-primary-500 text-sm font-medium">
                {t('home.limitedEdition')} • {t('home.newCollection')}
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-neon mb-6 tracking-wider">
              {settings.hero_title || t('home.heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide">
              {settings.hero_subtitle || t('home.heroSubtitle')}
            </p>

            {/* Description */}
            <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
              {settings.hero_description || t('home.heroDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products" className="btn-neon flex items-center gap-2">
                {t('home.exploreCollection')}
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="btn-outline-neon">
                {t('home.viewCatalog')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t('home.featuredProducts')}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Koleksi pilihan terbaik kami yang dirancang untuk Anda yang berani tampil beda.'
                : 'Our best curated collection designed for those who dare to stand out.'}
            </p>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {dummyProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12" data-aos="fade-up">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-semibold transition-colors"
            >
              {t('common.viewAll')}
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Exclusive Showcase Banner */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzM5ZmYxNCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                {lang === 'id' ? 'Koleksi Eksklusif' : 'Exclusive Collection'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {lang === 'id' ? (
                <>Lihat <span className="text-primary">Showcase</span> Eksklusif Kami</>
              ) : (
                <>Explore Our <span className="text-primary">Exclusive</span> Showcase</>
              )}
            </h2>

            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              {lang === 'id'
                ? 'Temukan koleksi premium limited edition yang dirancang khusus untuk showcase. Produk eksklusif yang tidak dijual regular, hanya untuk display dan promosi.'
                : 'Discover our premium limited edition collection designed exclusively for showcase. Exclusive products not sold regularly, only for display and promotional purposes.'}
            </p>

            <Link 
              to="/showcase"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-dark-900 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {lang === 'id' ? 'Lihat Showcase' : 'View Showcase'}
            </Link>
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t('home.whyChooseUs')}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t('home.testimonials')}
            </h2>
          </div>

          {/* Testimonials Grid */}
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <TestimonialSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dummyTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-dark p-6"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 italic">
                    "{lang === 'id' ? testimonial.content_id : testimonial.content_en}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <span className="text-primary-500 font-bold">
                        {testimonial.customer_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.customer_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.customer_location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-32 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t('home.newsletter')}
            </h2>
            <p className="text-gray-500 mb-8">
              {t('home.newsletterDesc')}
            </p>

            {/* Form */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('home.emailPlaceholder')}
                className="input-dark flex-1"
                required
              />
              <button type="submit" className="btn-neon whitespace-nowrap">
                {t('home.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
