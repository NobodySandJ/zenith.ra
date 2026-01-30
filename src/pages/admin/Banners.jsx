import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineEye
} from 'react-icons/hi'

export default function AdminBanners() {
  const { t } = useTranslation()
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const [formData, setFormData] = useState({
    title_en: '',
    title_id: '',
    subtitle_en: '',
    subtitle_id: '',
    button_text_en: '',
    button_text_id: '',
    button_link: '',
    image_url: '',
    position: 'hero',
    sort_order: 0,
    is_active: true
  })

  // Positions
  const positions = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'promo', label: 'Promo Banner' },
    { value: 'category', label: 'Category Banner' },
    { value: 'footer', label: 'Footer Banner' }
  ]

  // Load dummy banners
  useEffect(() => {
    const dummyBanners = [
      {
        id: 1,
        title_en: 'Dr. Doom Collection',
        title_id: 'Koleksi Dr. Doom',
        subtitle_en: 'Embrace the power of Latveria',
        subtitle_id: 'Rasakan kekuatan Latveria',
        button_text_en: 'Shop Now',
        button_text_id: 'Belanja Sekarang',
        button_link: '/products?collection=dr-doom',
        image_url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200',
        position: 'hero',
        sort_order: 1,
        is_active: true,
        created_at: '2024-01-15'
      },
      {
        id: 2,
        title_en: 'New Arrivals',
        title_id: 'Koleksi Terbaru',
        subtitle_en: 'Fresh drops for the season',
        subtitle_id: 'Koleksi terbaru musim ini',
        button_text_en: 'Discover',
        button_text_id: 'Temukan',
        button_link: '/products?sort=newest',
        image_url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200',
        position: 'hero',
        sort_order: 2,
        is_active: true,
        created_at: '2024-01-14'
      },
      {
        id: 3,
        title_en: '50% Off Hoodies',
        title_id: 'Diskon 50% Hoodie',
        subtitle_en: 'Limited time offer',
        subtitle_id: 'Penawaran terbatas',
        button_text_en: 'Get Deal',
        button_text_id: 'Dapatkan',
        button_link: '/products?category=hoodies&sale=true',
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200',
        position: 'promo',
        sort_order: 1,
        is_active: true,
        created_at: '2024-01-13'
      },
      {
        id: 4,
        title_en: 'Limited Edition Alert',
        title_id: 'Edisi Terbatas',
        subtitle_en: 'Only 100 pieces available',
        subtitle_id: 'Hanya 100 buah tersedia',
        button_text_en: 'View Collection',
        button_text_id: 'Lihat Koleksi',
        button_link: '/products?category=limited-edition',
        image_url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200',
        position: 'category',
        sort_order: 1,
        is_active: false,
        created_at: '2024-01-12'
      }
    ]

    setTimeout(() => {
      setBanners(dummyBanners)
      setLoading(false)
    }, 500)
  }, [])

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner)
      setFormData({
        title_en: banner.title_en,
        title_id: banner.title_id,
        subtitle_en: banner.subtitle_en,
        subtitle_id: banner.subtitle_id,
        button_text_en: banner.button_text_en,
        button_text_id: banner.button_text_id,
        button_link: banner.button_link,
        image_url: banner.image_url,
        position: banner.position,
        sort_order: banner.sort_order,
        is_active: banner.is_active
      })
    } else {
      setEditingBanner(null)
      setFormData({
        title_en: '',
        title_id: '',
        subtitle_en: '',
        subtitle_id: '',
        button_text_en: '',
        button_text_id: '',
        button_link: '',
        image_url: '',
        position: 'hero',
        sort_order: banners.length + 1,
        is_active: true
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBanner(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingBanner) {
      setBanners(prev => prev.map(b => 
        b.id === editingBanner.id 
          ? { ...b, ...formData }
          : b
      ))
      toast.success(t('admin.banners.updateSuccess'))
    } else {
      const newBanner = {
        id: banners.length + 1,
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      }
      setBanners(prev => [newBanner, ...prev])
      toast.success(t('admin.banners.createSuccess'))
    }
    
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm(t('admin.banners.deleteConfirm'))) {
      setBanners(prev => prev.filter(b => b.id !== id))
      toast.success(t('admin.banners.deleteSuccess'))
    }
  }

  const toggleStatus = (id) => {
    setBanners(prev => prev.map(b => 
      b.id === id ? { ...b, is_active: !b.is_active } : b
    ))
    toast.success(t('admin.banners.statusUpdated'))
  }

  const getPositionLabel = (position) => {
    return positions.find(p => p.value === position)?.label || position
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
          <h1 className="text-2xl font-bold text-white">{t('admin.banners.title')}</h1>
          <p className="text-gray-500">{t('admin.banners.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-neon flex items-center gap-2"
        >
          <HiOutlinePlus className="w-5 h-5" />
          {t('admin.banners.addNew')}
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-dark overflow-hidden group hover:border-primary-500/30 transition-all"
          >
            {/* Banner Image */}
            <div className="relative aspect-[2/1] overflow-hidden">
              <img
                src={banner.image_url}
                alt={banner.title_en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="px-2 py-1 bg-primary-500/20 text-primary-500 text-xs rounded mb-2 inline-block">
                  {getPositionLabel(banner.position)}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{banner.title_en}</h3>
                <p className="text-gray-400 text-sm">{banner.subtitle_en}</p>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  banner.is_active
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center justify-between border-t border-dark-700">
              <div className="text-gray-500 text-sm">
                Button: <span className="text-white">{banner.button_text_en}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(banner.id)}
                  className={`p-2 transition-colors ${
                    banner.is_active ? 'text-green-500' : 'text-gray-500'
                  } hover:text-primary-500`}
                  title={banner.is_active ? 'Deactivate' : 'Activate'}
                >
                  <HiOutlineEye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleOpenModal(banner)}
                  className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                  title="Edit"
                >
                  <HiOutlinePencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="card-dark p-12 text-center">
          <HiOutlinePhotograph className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">{t('admin.banners.noBanners')}</p>
        </div>
      )}

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
              className="bg-dark-900 border border-dark-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold text-white">
                  {editingBanner ? t('admin.banners.editBanner') : t('admin.banners.addBanner')}
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

                {/* Subtitles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Subtitle (English)
                    </label>
                    <input
                      type="text"
                      name="subtitle_en"
                      value={formData.subtitle_en}
                      onChange={handleChange}
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Subtitle (Indonesian)
                    </label>
                    <input
                      type="text"
                      name="subtitle_id"
                      value={formData.subtitle_id}
                      onChange={handleChange}
                      className="input-dark w-full"
                    />
                  </div>
                </div>

                {/* Button Texts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Button Text (English)
                    </label>
                    <input
                      type="text"
                      name="button_text_en"
                      value={formData.button_text_en}
                      onChange={handleChange}
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Button Text (Indonesian)
                    </label>
                    <input
                      type="text"
                      name="button_text_id"
                      value={formData.button_text_id}
                      onChange={handleChange}
                      className="input-dark w-full"
                    />
                  </div>
                </div>

                {/* Button Link */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    name="button_link"
                    value={formData.button_link}
                    onChange={handleChange}
                    placeholder="/products?category=..."
                    className="input-dark w-full"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="input-dark w-full"
                    required
                  />
                  {formData.image_url && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>

                {/* Position & Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Position
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="input-dark w-full"
                    >
                      {positions.map(pos => (
                        <option key={pos.value} value={pos.value}>{pos.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      name="sort_order"
                      value={formData.sort_order}
                      onChange={handleChange}
                      min="0"
                      className="input-dark w-full"
                    />
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
                  <span className="text-white">Active</span>
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
                    {editingBanner ? 'Update Banner' : 'Create Banner'}
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
