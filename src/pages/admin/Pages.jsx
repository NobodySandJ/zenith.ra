import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlineEye
} from 'react-icons/hi'

export default function AdminPages() {
  const { t } = useTranslation()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState(null)
  const [formData, setFormData] = useState({
    title_en: '',
    title_id: '',
    slug: '',
    content_en: '',
    content_id: '',
    meta_title_en: '',
    meta_title_id: '',
    meta_description_en: '',
    meta_description_id: '',
    is_active: true
  })

  // Load dummy pages
  useEffect(() => {
    const dummyPages = [
      {
        id: 1,
        title_en: 'About Us',
        title_id: 'Tentang Kami',
        slug: 'about',
        content_en: '<h2>Our Story</h2><p>Zenith.ra was born from a passion for fashion and a love for bold, futuristic designs...</p>',
        content_id: '<h2>Cerita Kami</h2><p>Zenith.ra lahir dari passion untuk fashion dan kecintaan pada desain yang berani dan futuristik...</p>',
        meta_title_en: 'About Zenith.ra - Premium Streetwear',
        meta_title_id: 'Tentang Zenith.ra - Streetwear Premium',
        meta_description_en: 'Learn about Zenith.ra, the premium streetwear brand inspired by power and elegance.',
        meta_description_id: 'Pelajari tentang Zenith.ra, brand streetwear premium yang terinspirasi oleh kekuatan dan elegan.',
        is_active: true,
        updated_at: '2024-01-15'
      },
      {
        id: 2,
        title_en: 'Terms & Conditions',
        title_id: 'Syarat & Ketentuan',
        slug: 'terms',
        content_en: '<h2>Terms of Service</h2><p>By accessing this website, you agree to be bound by these terms...</p>',
        content_id: '<h2>Ketentuan Layanan</h2><p>Dengan mengakses website ini, Anda setuju untuk terikat dengan ketentuan ini...</p>',
        meta_title_en: 'Terms & Conditions - Zenith.ra',
        meta_title_id: 'Syarat & Ketentuan - Zenith.ra',
        meta_description_en: 'Read our terms and conditions for using Zenith.ra services.',
        meta_description_id: 'Baca syarat dan ketentuan untuk menggunakan layanan Zenith.ra.',
        is_active: true,
        updated_at: '2024-01-14'
      },
      {
        id: 3,
        title_en: 'Privacy Policy',
        title_id: 'Kebijakan Privasi',
        slug: 'privacy',
        content_en: '<h2>Privacy Policy</h2><p>We are committed to protecting your personal information...</p>',
        content_id: '<h2>Kebijakan Privasi</h2><p>Kami berkomitmen untuk melindungi informasi pribadi Anda...</p>',
        meta_title_en: 'Privacy Policy - Zenith.ra',
        meta_title_id: 'Kebijakan Privasi - Zenith.ra',
        meta_description_en: 'Learn how Zenith.ra protects your privacy and personal data.',
        meta_description_id: 'Pelajari bagaimana Zenith.ra melindungi privasi dan data pribadi Anda.',
        is_active: true,
        updated_at: '2024-01-13'
      },
      {
        id: 4,
        title_en: 'Shipping Information',
        title_id: 'Informasi Pengiriman',
        slug: 'shipping',
        content_en: '<h2>Shipping Policy</h2><p>We ship to over 50 countries worldwide...</p>',
        content_id: '<h2>Kebijakan Pengiriman</h2><p>Kami mengirim ke lebih dari 50 negara di seluruh dunia...</p>',
        meta_title_en: 'Shipping Information - Zenith.ra',
        meta_title_id: 'Informasi Pengiriman - Zenith.ra',
        meta_description_en: 'Find out about Zenith.ra shipping policies and delivery times.',
        meta_description_id: 'Ketahui tentang kebijakan pengiriman dan waktu pengiriman Zenith.ra.',
        is_active: true,
        updated_at: '2024-01-12'
      },
      {
        id: 5,
        title_en: 'Return Policy',
        title_id: 'Kebijakan Pengembalian',
        slug: 'returns',
        content_en: '<h2>Return & Exchange</h2><p>We offer a 30-day return policy on all items...</p>',
        content_id: '<h2>Pengembalian & Penukaran</h2><p>Kami menawarkan kebijakan pengembalian 30 hari untuk semua item...</p>',
        meta_title_en: 'Return Policy - Zenith.ra',
        meta_title_id: 'Kebijakan Pengembalian - Zenith.ra',
        meta_description_en: 'Learn about Zenith.ra return and exchange policies.',
        meta_description_id: 'Pelajari tentang kebijakan pengembalian dan penukaran Zenith.ra.',
        is_active: false,
        updated_at: '2024-01-11'
      }
    ]

    setTimeout(() => {
      setPages(dummyPages)
      setLoading(false)
    }, 500)
  }, [])

  const handleOpenModal = (page = null) => {
    if (page) {
      setEditingPage(page)
      setFormData({
        title_en: page.title_en,
        title_id: page.title_id,
        slug: page.slug,
        content_en: page.content_en,
        content_id: page.content_id,
        meta_title_en: page.meta_title_en,
        meta_title_id: page.meta_title_id,
        meta_description_en: page.meta_description_en,
        meta_description_id: page.meta_description_id,
        is_active: page.is_active
      })
    } else {
      setEditingPage(null)
      setFormData({
        title_en: '',
        title_id: '',
        slug: '',
        content_en: '',
        content_id: '',
        meta_title_en: '',
        meta_title_id: '',
        meta_description_en: '',
        meta_description_id: '',
        is_active: true
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPage(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-generate slug
    if (name === 'title_en') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingPage) {
      setPages(prev => prev.map(p => 
        p.id === editingPage.id 
          ? { ...p, ...formData, updated_at: new Date().toISOString().split('T')[0] }
          : p
      ))
      toast.success(t('admin.pages.updateSuccess'))
    } else {
      const newPage = {
        id: pages.length + 1,
        ...formData,
        updated_at: new Date().toISOString().split('T')[0]
      }
      setPages(prev => [newPage, ...prev])
      toast.success(t('admin.pages.createSuccess'))
    }
    
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm(t('admin.pages.deleteConfirm'))) {
      setPages(prev => prev.filter(p => p.id !== id))
      toast.success(t('admin.pages.deleteSuccess'))
    }
  }

  const toggleStatus = (id) => {
    setPages(prev => prev.map(p => 
      p.id === id ? { ...p, is_active: !p.is_active } : p
    ))
    toast.success(t('admin.pages.statusUpdated'))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('admin.pages.title')}</h1>
          <p className="text-gray-500">{t('admin.pages.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-neon flex items-center gap-2"
        >
          <HiOutlinePlus className="w-5 h-5" />
          {t('admin.pages.addNew')}
        </button>
      </div>

      {/* Pages Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-dark-700">
                <th className="text-left p-4 font-medium">Page</th>
                <th className="text-left p-4 font-medium">Slug</th>
                <th className="text-center p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Last Updated</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {pages.map((page) => (
                <motion.tr
                  key={page.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-dark-800/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-dark-700 rounded-lg">
                        <HiOutlineDocumentText className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-primary-500 transition-colors">
                          {page.title_en}
                        </p>
                        <p className="text-gray-500 text-sm">{page.title_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400">/{page.slug}</span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleStatus(page.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        page.is_active
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {page.is_active ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {page.updated_at}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/${page.slug}`, '_blank')}
                        className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                        title="View"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(page)}
                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages.length === 0 && (
          <div className="text-center py-12">
            <HiOutlineDocumentText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">{t('admin.pages.noPages')}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-dark-900 border border-dark-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700 sticky top-0 bg-dark-900">
                <h2 className="text-xl font-bold text-white">
                  {editingPage ? t('admin.pages.editPage') : t('admin.pages.addPage')}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Titles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      name="title_en"
                      value={formData.title_en}
                      onChange={handleChange}
                      className="input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Title (Indonesian) *
                    </label>
                    <input
                      type="text"
                      name="title_id"
                      value={formData.title_id}
                      onChange={handleChange}
                      className="input-dark w-full"
                      required
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="input-dark flex-1"
                      required
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Content (English) *
                    </label>
                    <textarea
                      name="content_en"
                      value={formData.content_en}
                      onChange={handleChange}
                      rows={8}
                      className="input-dark w-full resize-none font-mono text-sm"
                      placeholder="<h2>Heading</h2><p>Content...</p>"
                      required
                    />
                    <p className="text-gray-600 text-xs mt-1">HTML supported</p>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Content (Indonesian) *
                    </label>
                    <textarea
                      name="content_id"
                      value={formData.content_id}
                      onChange={handleChange}
                      rows={8}
                      className="input-dark w-full resize-none font-mono text-sm"
                      placeholder="<h2>Judul</h2><p>Konten...</p>"
                      required
                    />
                    <p className="text-gray-600 text-xs mt-1">HTML supported</p>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="pt-4 border-t border-dark-700">
                  <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
                  
                  {/* Meta Titles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Meta Title (English)
                      </label>
                      <input
                        type="text"
                        name="meta_title_en"
                        value={formData.meta_title_en}
                        onChange={handleChange}
                        className="input-dark w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Meta Title (Indonesian)
                      </label>
                      <input
                        type="text"
                        name="meta_title_id"
                        value={formData.meta_title_id}
                        onChange={handleChange}
                        className="input-dark w-full"
                      />
                    </div>
                  </div>

                  {/* Meta Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Meta Description (English)
                      </label>
                      <textarea
                        name="meta_description_en"
                        value={formData.meta_description_en}
                        onChange={handleChange}
                        rows={3}
                        className="input-dark w-full resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Meta Description (Indonesian)
                      </label>
                      <textarea
                        name="meta_description_id"
                        value={formData.meta_description_id}
                        onChange={handleChange}
                        rows={3}
                        className="input-dark w-full resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Active */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="form-checkbox bg-dark-800 border-dark-600 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-white">Publish Page</span>
                </label>

                {/* Submit */}
                <div className="flex justify-end gap-4 pt-4 border-t border-dark-700">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-neon"
                  >
                    {editingPage ? 'Update Page' : 'Create Page'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
