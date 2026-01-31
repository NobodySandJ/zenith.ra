import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineSparkles, HiOutlineEye } from 'react-icons/hi'
import { Link } from 'react-router-dom'

/**
 * SHOWCASE EKSLUSIF - Halaman Galeri Promosi
 * 
 * Fitur:
 * - Menampilkan produk eksklusif untuk promosi
 * - TIDAK menampilkan harga
 * - Fokus pada visual dan branding
 * - Produk ditandai dengan is_featured = true
 * - Dapat diatur dari Admin Panel
 * 
 * Kegunaan:
 * - Promosi produk limited edition
 * - Showcase kolaborasi brand
 * - Display untuk event khusus
 * - Marketing campaign tanpa focus penjualan
 */

export default function Showcase() {
  const { t, i18n } = useTranslation()
  const [showcaseProducts, setShowcaseProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with Supabase query
    // SELECT * FROM products WHERE is_featured = true
    
    // Dummy data - produk showcase eksklusif
    const dummyShowcase = [
      {
        id: 1,
        name_en: 'Neon Dreams Collection',
        name_id: 'Koleksi Neon Dreams',
        slug: 'neon-dreams-limited',
        short_description_en: 'Limited edition collaboration with digital artists',
        short_description_id: 'Kolaborasi edisi terbatas dengan seniman digital',
        image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
        is_featured: true,
        badge_en: 'Exclusive',
        badge_id: 'Eksklusif',
        highlight_en: 'Collaboration with renowned digital artists - Only 300 pieces',
        highlight_id: 'Kolaborasi dengan seniman digital ternama - Hanya 300 pieces'
      },
      {
        id: 2,
        name_en: 'Cyberpunk 2077 Series',
        name_id: 'Seri Cyberpunk 2077',
        slug: 'cyberpunk-series',
        short_description_en: 'Official collaboration merchandise',
        short_description_id: 'Merchandise kolaborasi resmi',
        image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
        is_featured: true,
        badge_en: 'Coming Soon',
        badge_id: 'Segera Hadir',
        highlight_en: 'Official CD Projekt RED collaboration - Pre-launch exclusive',
        highlight_id: 'Kolaborasi resmi CD Projekt RED - Eksklusif pre-launch'
      },
      {
        id: 3,
        name_en: 'Future Tech Premium',
        name_id: 'Future Tech Premium',
        slug: 'future-tech-premium',
        short_description_en: 'Premium quality with smart fabric technology',
        short_description_id: 'Kualitas premium dengan teknologi kain pintar',
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        is_featured: true,
        badge_en: 'Innovation',
        badge_id: 'Inovasi',
        highlight_en: 'Revolutionary temperature-regulating fabric technology',
        highlight_id: 'Teknologi kain pengatur suhu yang revolusioner'
      },
      {
        id: 4,
        name_en: 'Neon Wave Signature',
        name_id: 'Neon Wave Signature',
        slug: 'neon-wave-signature',
        short_description_en: 'Signature collection by lead designer',
        short_description_id: 'Koleksi signature oleh desainer utama',
        image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
        is_featured: true,
        badge_en: 'Designer Choice',
        badge_id: 'Pilihan Desainer',
        highlight_en: 'Hand-signed by lead designer - Museum quality piece',
        highlight_id: 'Ditandatangani desainer utama - Kualitas museum'
      },
      {
        id: 5,
        name_en: 'Holographic Dreams',
        name_id: 'Holographic Dreams',
        slug: 'holographic-dreams',
        short_description_en: 'Revolutionary holographic print technology',
        short_description_id: 'Teknologi cetak holografik revolusioner',
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        is_featured: true,
        badge_en: 'New Tech',
        badge_id: 'Teknologi Baru',
        highlight_en: 'First-ever holographic streetwear - Patent pending',
        highlight_id: 'Streetwear holografik pertama - Patent pending'
      },
      {
        id: 6,
        name_en: 'Midnight Glow Series',
        name_id: 'Seri Midnight Glow',
        slug: 'midnight-glow',
        short_description_en: 'Glow-in-the-dark premium collection',
        short_description_id: 'Koleksi premium yang menyala dalam gelap',
        image_url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800',
        is_featured: true,
        badge_en: 'Limited',
        badge_id: 'Terbatas',
        highlight_en: '12-hour glow technology - Night event exclusive',
        highlight_id: 'Teknologi glow 12 jam - Eksklusif event malam'
      }
    ]

    setTimeout(() => {
      setShowcaseProducts(dummyShowcase)
      setLoading(false)
    }, 800)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading Exclusive Showcase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
              <HiOutlineSparkles className="text-primary text-xl" />
              <span className="text-primary font-medium">
                {i18n.language === 'id' ? 'Showcase Eksklusif' : 'Exclusive Showcase'}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              {i18n.language === 'id' ? (
                <>
                  GALERI <span className="text-primary">EKSKLUSIF</span>
                </>
              ) : (
                <>
                  EXCLUSIVE <span className="text-primary">GALLERY</span>
                </>
              )}
            </h1>

            <p className="text-xl text-white/60 mb-8">
              {i18n.language === 'id'
                ? 'Koleksi premium yang dirancang khusus untuk showcase. Produk ini tidak dijual secara regular, hanya untuk promosi dan display eksklusif.'
                : 'Premium collection designed specifically for showcase. These products are not sold regularly, only for promotional and exclusive display purposes.'}
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-white/40">
              <span>{showcaseProducts.length} {i18n.language === 'id' ? 'Produk Eksklusif' : 'Exclusive Items'}</span>
              <span>•</span>
              <span>{i18n.language === 'id' ? 'Tidak Untuk Dijual' : 'Not For Sale'}</span>
              <span>•</span>
              <span>{i18n.language === 'id' ? 'Hanya Display' : 'Display Only'}</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Showcase Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {showcaseProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <Link to={`/products/${product.slug}`}>
                  {/* Card Container */}
                  <div className="relative bg-dark-800/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-primary/90 backdrop-blur-sm text-dark-900 text-xs font-bold px-3 py-1.5 rounded-full">
                        {i18n.language === 'id' ? product.badge_id : product.badge_en}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-dark-900">
                      <img
                        src={product.image_url}
                        alt={i18n.language === 'id' ? product.name_id : product.name_en}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60"></div>
                      
                      {/* View Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                          <HiOutlineEye className="text-dark-900 text-2xl" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {i18n.language === 'id' ? product.name_id : product.name_en}
                      </h3>
                      
                      <p className="text-white/60 text-sm mb-3 line-clamp-2">
                        {i18n.language === 'id' ? product.short_description_id : product.short_description_en}
                      </p>

                      {/* Highlight/Collaboration Info */}
                      {product.highlight_en && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-lg">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            ✨ {i18n.language === 'id' ? product.highlight_id : product.highlight_en}
                          </p>
                        </div>
                      )}

                      {/* Not For Sale Badge */}
                      <div className="flex items-center gap-2 text-primary/80 text-sm">
                        <HiOutlineSparkles className="text-lg" />
                        <span className="font-medium">
                          {i18n.language === 'id' ? 'Display Eksklusif' : 'Exclusive Display'}
                        </span>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Products State */}
          {showcaseProducts.length === 0 && (
            <div className="text-center py-20">
              <HiOutlineSparkles className="text-6xl text-white/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white/40 mb-2">
                {i18n.language === 'id' ? 'Belum Ada Showcase' : 'No Showcase Yet'}
              </h3>
              <p className="text-white/30">
                {i18n.language === 'id'
                  ? 'Showcase eksklusif akan segera hadir.'
                  : 'Exclusive showcase coming soon.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {i18n.language === 'id' ? 'Tentang Showcase Eksklusif' : 'About Exclusive Showcase'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineSparkles className="text-primary text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {i18n.language === 'id' ? 'Eksklusif' : 'Exclusive'}
                </h3>
                <p className="text-white/60 text-sm">
                  {i18n.language === 'id'
                    ? 'Produk ini dirancang khusus untuk showcase dan tidak dijual secara regular'
                    : 'These products are specially designed for showcase and are not sold regularly'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineEye className="text-primary text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {i18n.language === 'id' ? 'Display Only' : 'Display Only'}
                </h3>
                <p className="text-white/60 text-sm">
                  {i18n.language === 'id'
                    ? 'Fokus pada visual dan branding, tanpa harga untuk pengalaman promosi yang murni'
                    : 'Focus on visuals and branding, without prices for a pure promotional experience'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {i18n.language === 'id' ? 'Dapat Diatur' : 'Manageable'}
                </h3>
                <p className="text-white/60 text-sm">
                  {i18n.language === 'id'
                    ? 'Admin dapat mengatur produk mana yang masuk showcase melalui panel admin'
                    : 'Admins can manage which products appear in the showcase through the admin panel'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
