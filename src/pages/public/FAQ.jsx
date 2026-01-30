import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronDown, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { Link } from 'react-router-dom'

// Dummy FAQ data
const dummyFaqs = [
  {
    id: '1',
    question_en: 'What materials are your t-shirts made of?',
    question_id: 'Bahan apa yang digunakan untuk kaos kalian?',
    answer_en: 'Our t-shirts are made from premium 100% cotton with a weight of 220-250 GSM, ensuring comfort and durability. We use combed cotton for a softer feel and better print quality.',
    answer_id: 'Kaos kami terbuat dari katun premium 100% dengan berat 220-250 GSM, memastikan kenyamanan dan daya tahan. Kami menggunakan katun combed untuk sentuhan yang lebih lembut dan kualitas cetak yang lebih baik.',
    category: 'product'
  },
  {
    id: '2',
    question_en: 'How do I choose the right size?',
    question_id: 'Bagaimana cara memilih ukuran yang tepat?',
    answer_en: 'Please refer to our size guide on each product page. We recommend measuring your favorite t-shirt and comparing it to our size chart. If you\'re between sizes, we suggest sizing up for a relaxed fit.',
    answer_id: 'Silakan lihat panduan ukuran di setiap halaman produk. Kami merekomendasikan untuk mengukur kaos favorit Anda dan membandingkannya dengan tabel ukuran kami. Jika Anda berada di antara ukuran, kami menyarankan untuk memilih ukuran yang lebih besar untuk fit yang lebih santai.',
    category: 'product'
  },
  {
    id: '3',
    question_en: 'What are your shipping options?',
    question_id: 'Apa saja pilihan pengiriman kalian?',
    answer_en: 'We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Free shipping for orders above Rp 500,000. We ship nationwide and to select international destinations.',
    answer_id: 'Kami menawarkan pengiriman standar (3-5 hari kerja) dan pengiriman ekspres (1-2 hari kerja). Gratis ongkir untuk pesanan di atas Rp 500.000. Kami mengirim ke seluruh Indonesia dan beberapa destinasi internasional.',
    category: 'shipping'
  },
  {
    id: '4',
    question_en: 'Can I return or exchange my order?',
    question_id: 'Bisakah saya mengembalikan atau menukar pesanan?',
    answer_en: 'Yes, we accept returns and exchanges within 14 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached. Please note that sale items are final sale.',
    answer_id: 'Ya, kami menerima pengembalian dan penukaran dalam 14 hari setelah pengiriman. Barang harus belum dipakai, belum dicuci, dan dalam kemasan asli dengan tag terpasang. Harap dicatat bahwa barang sale tidak dapat dikembalikan.',
    category: 'returns'
  },
  {
    id: '5',
    question_en: 'How can I track my order?',
    question_id: 'Bagaimana cara melacak pesanan saya?',
    answer_en: 'Once your order is shipped, you will receive a tracking number via email. You can use this to track your package on our website or the courier\'s site. Tracking updates may take 24 hours to appear.',
    answer_id: 'Setelah pesanan Anda dikirim, Anda akan menerima nomor resi melalui email. Anda dapat menggunakan ini untuk melacak paket di website kami atau situs kurir. Update tracking mungkin membutuhkan waktu 24 jam untuk muncul.',
    category: 'shipping'
  },
  {
    id: '6',
    question_en: 'Are your t-shirts true to size?',
    question_id: 'Apakah ukuran kaos kalian sesuai standar?',
    answer_en: 'Our t-shirts are designed with a slightly oversized fit, which is our signature style. If you prefer a more fitted look, we recommend sizing down. Check our size chart for exact measurements.',
    answer_id: 'Kaos kami dirancang dengan fit sedikit oversized, yang merupakan gaya khas kami. Jika Anda lebih suka tampilan yang lebih pas, kami menyarankan untuk memilih ukuran lebih kecil. Cek tabel ukuran kami untuk pengukuran yang tepat.',
    category: 'product'
  },
  {
    id: '7',
    question_en: 'Do you offer international shipping?',
    question_id: 'Apakah kalian menawarkan pengiriman internasional?',
    answer_en: 'Yes! We ship to Singapore, Malaysia, Australia, and other select countries. International shipping rates and delivery times vary by destination. Please check at checkout for available options.',
    answer_id: 'Ya! Kami mengirim ke Singapura, Malaysia, Australia, dan negara-negara pilihan lainnya. Tarif dan waktu pengiriman internasional bervariasi tergantung tujuan. Silakan cek saat checkout untuk opsi yang tersedia.',
    category: 'shipping'
  },
  {
    id: '8',
    question_en: 'How do I care for my Zenith.ra t-shirt?',
    question_id: 'Bagaimana cara merawat kaos Zenith.ra?',
    answer_en: 'Machine wash cold inside out with similar colors. Do not bleach. Tumble dry low or hang dry. Iron on low heat if needed, avoiding the print area. Following these instructions will help maintain the quality and longevity of your t-shirt.',
    answer_id: 'Cuci mesin dengan air dingin, balik bagian dalam, dengan warna serupa. Jangan gunakan pemutih. Keringkan dengan mesin suhu rendah atau gantung. Setrika suhu rendah jika perlu, hindari area cetak. Mengikuti instruksi ini akan membantu menjaga kualitas dan umur kaos Anda.',
    category: 'product'
  },
]

const categories = [
  { id: 'all', name_en: 'All', name_id: 'Semua' },
  { id: 'product', name_en: 'Product', name_id: 'Produk' },
  { id: 'shipping', name_en: 'Shipping', name_id: 'Pengiriman' },
  { id: 'returns', name_en: 'Returns', name_id: 'Pengembalian' },
]

function FAQItem({ faq, isOpen, onToggle, lang }) {
  const question = lang === 'id' ? faq.question_id : faq.question_en
  const answer = lang === 'id' ? faq.answer_id : faq.answer_en

  return (
    <div className="border-b border-dark-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-white pr-8">{question}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isOpen ? 'bg-primary-500 text-black' : 'bg-dark-700 text-gray-400'
        }`}>
          {isOpen ? (
            <HiOutlineMinus className="w-5 h-5" />
          ) : (
            <HiOutlinePlus className="w-5 h-5" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState(null)
  const lang = i18n.language

  const filteredFaqs = activeCategory === 'all'
    ? dummyFaqs
    : dummyFaqs.filter(faq => faq.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-black'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
              }`}
            >
              {lang === 'id' ? category.name_id : category.name_en}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <div className="card-dark p-6 lg:p-8" data-aos="fade-up">
            {filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                lang={lang}
              />
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-gray-400 mb-4">{t('faq.stillHaveQuestions')}</p>
          <p className="text-gray-500 mb-6">{t('faq.contactUs')}</p>
          <Link to="/contact" className="btn-outline-neon">
            {t('contact.title')}
          </Link>
        </div>
      </div>
    </div>
  )
}
