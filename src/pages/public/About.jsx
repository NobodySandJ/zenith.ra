import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineHeart
} from 'react-icons/hi'

export default function About() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const values = [
    {
      icon: HiOutlineSparkles,
      title: lang === 'id' ? 'Kualitas Premium' : 'Premium Quality',
      description: lang === 'id' 
        ? 'Kami hanya menggunakan bahan terbaik untuk setiap produk yang kami buat.'
        : 'We only use the best materials for every product we create.'
    },
    {
      icon: HiOutlineLightningBolt,
      title: lang === 'id' ? 'Inovasi Desain' : 'Design Innovation',
      description: lang === 'id'
        ? 'Desain futuristik yang berani dan berbeda dari yang lain.'
        : 'Bold futuristic designs that stand out from the rest.'
    },
    {
      icon: HiOutlineGlobe,
      title: lang === 'id' ? 'Praktik Berkelanjutan' : 'Sustainable Practices',
      description: lang === 'id'
        ? 'Komitmen kami terhadap lingkungan dalam setiap proses produksi.'
        : 'Our commitment to the environment in every production process.'
    },
    {
      icon: HiOutlineHeart,
      title: lang === 'id' ? 'Komunitas' : 'Community First',
      description: lang === 'id'
        ? 'Membangun komunitas yang solid dengan pelanggan kami.'
        : 'Building a solid community with our customers.'
    },
  ]

  const stats = [
    { value: '10K+', label: lang === 'id' ? 'Pelanggan Puas' : 'Happy Customers' },
    { value: '50+', label: lang === 'id' ? 'Desain Unik' : 'Unique Designs' },
    { value: '15+', label: lang === 'id' ? 'Kolaborasi' : 'Collaborations' },
    { value: '99%', label: lang === 'id' ? 'Rating Positif' : 'Positive Rating' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-dark-800">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                    alt="Our Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-500/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary-500/30 rounded-2xl -z-10" />
              </div>
            </div>

            <div data-aos="fade-left">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                {t('about.ourStory')}
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  {lang === 'id' 
                    ? 'Zenith.ra lahir dari passion terhadap streetwear gelap dan visi untuk menciptakan sesuatu yang powerful. Didirikan pada tahun 2024, kami memulai perjalanan ini dengan satu tujuan: membawa estetika villain ke dalam fashion sehari-hari.'
                    : 'Zenith.ra was born from a passion for dark streetwear and a vision to create something powerful. Founded in 2024, we started this journey with one goal: to bring villain aesthetics into everyday fashion.'}
                </p>
                <p>
                  {lang === 'id'
                    ? 'Setiap kaos yang kami buat adalah hasil dari proses kreatif yang panjang, menggunakan bahan premium dan teknologi cetak terbaik. Kami percaya bahwa pakaian adalah armor - dan kami ingin membantu Anda untuk mendominasi dengan cara yang unik.'
                    : 'Every t-shirt we make is the result of a long creative process, using premium materials and the best printing technology. We believe that clothing is armor - and we want to help you dominate in a unique way.'}
                </p>
                <p>
                  {lang === 'id'
                    ? 'Nama "Zenith" berarti titik tertinggi, dan ".ra" terinspirasi dari kekuatan absolut - melambangkan dominasi dan supremasi dalam industri fashion.'
                    : 'The name "Zenith" means the highest point, and ".ra" is inspired by absolute power - symbolizing domination and supremacy in the fashion industry.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-dark p-6 text-center"
              >
                <div className="text-4xl font-display font-bold text-neon mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              {t('about.ourValues')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-dark p-6 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="card-dark p-8 lg:p-12 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            {t('about.ourMission')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {lang === 'id'
              ? '"Memberikan streetwear berkualitas premium yang memberdayakan individu untuk mengekspresikan gaya unik mereka sambil mendorong batasan fashion dan menjaga komitmen terhadap keberlanjutan."'
              : '"To provide premium quality streetwear that empowers individuals to express their unique style while pushing the boundaries of fashion and maintaining a commitment to sustainability."'}
          </p>
        </section>
      </div>
    </div>
  )
}
