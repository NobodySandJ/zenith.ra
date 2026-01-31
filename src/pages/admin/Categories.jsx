import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCollection,
  HiOutlineSearch
} from 'react-icons/hi'

export default function AdminCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name_en: '',
    name_id: '',
    slug: '',
    description_en: '',
    description_id: '',
    is_active: true
  })

  // Load dummy categories
  useEffect(() => {
    const dummyCategories = [
      {
        id: 1,
        name_en: 'T-Shirts',
        name_id: 'Kaos',
        slug: 't-shirts',
        description_en: 'Premium quality t-shirts for everyday wear',
        description_id: 'Kaos berkualitas premium untuk pakaian sehari-hari',
        is_active: true,
        product_count: 15,
        created_at: '2024-01-10'
      },
      {
        id: 2,
        name_en: 'Hoodies',
        name_id: 'Hoodie',
        slug: 'hoodies',
        description_en: 'Cozy hoodies with modern designs',
        description_id: 'Hoodie nyaman dengan desain modern',
        is_active: true,
        product_count: 8,
        created_at: '2024-01-10'
      },
      {
        id: 3,
        name_en: 'Accessories',
        name_id: 'Aksesoris',
        slug: 'accessories',
        description_en: 'Caps, bags, and more',
        description_id: 'Topi, tas, dan lainnya',
        is_active: true,
        product_count: 12,
        created_at: '2024-01-10'
      },
      {
        id: 4,
        name_en: 'Limited Edition',
        name_id: 'Edisi Terbatas',
        slug: 'limited-edition',
        description_en: 'Exclusive limited collection items',
        description_id: 'Item koleksi terbatas eksklusif',
        is_active: true,
        product_count: 5,
        created_at: '2024-01-10'
      }
    ]

    setTimeout(() => {
      setCategories(dummyCategories)
      setLoading(false)
    }, 500)
  }, [])

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name_en: category.name_en,
        name_id: category.name_id,
        slug: category.slug,
        description_en: category.description_en,
        description_id: category.description_id,
        is_active: category.is_active
      })
    } else {
      setEditingCategory(null)
      setFormData({
        name_en: '',
        name_id: '',
        slug: '',
        description_en: '',
        description_id: '',
        is_active: true
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-generate slug
    if (name === 'name_en') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingCategory) {
      setCategories(prev => prev.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...formData }
          : c
      ))
      toast.success(t('admin.categories.updateSuccess'))
    } else {
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        product_count: 0,
        created_at: new Date().toISOString().split('T')[0]
      }
      setCategories(prev => [newCategory, ...prev])
      toast.success(t('admin.categories.createSuccess'))
    }
    
    handleCloseModal()
  }

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id)
    if (category.product_count > 0) {
      toast.error(t('admin.categories.cannotDelete'))
      return
    }
    
    if (window.confirm(t('admin.categories.deleteConfirm'))) {
      setCategories(prev => prev.filter(c => c.id !== id))
      toast.success(t('admin.categories.deleteSuccess'))
    }
  }

  const toggleStatus = (id) => {
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, is_active: !c.is_active } : c
    ))
    toast.success(t('admin.categories.statusUpdated'))
  }

  // Filter categories by search
  const filteredCategories = categories.filter(cat =>
    cat.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.name_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description_en.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-2xl font-bold text-white">{t('admin.categories.title')}</h1>
          <p className="text-gray-500">{t('admin.categories.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-neon flex items-center gap-2"
        >
          <HiOutlinePlus className="w-5 h-5" />
          {t('admin.categories.addNew')}
        </button>
      </div>

      {/* Search */}
      <div className="card-dark p-4">
        <div className="relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="input-dark pl-12 w-full"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-dark p-6 group hover:border-primary-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                <HiOutlineCollection className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                  title="Edit"
                >
                  <HiOutlinePencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-500 transition-colors">
              {category.name_en}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{category.name_id}</p>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {category.description_en}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <span className="text-gray-500 text-sm">
                {category.product_count} products
              </span>
              <button
                onClick={() => toggleStatus(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  category.is_active
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {category.is_active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="card-dark p-12 text-center">
          <HiOutlineCollection className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">{t('admin.categories.noCategories')}</p>
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
              className="bg-dark-900 border border-dark-700 rounded-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold text-white">
                  {editingCategory ? t('admin.categories.editCategory') : t('admin.categories.addCategory')}
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
                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Name (English) *
                    </label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleChange}
                      className="input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Name (Indonesian) *
                    </label>
                    <input
                      type="text"
                      name="name_id"
                      value={formData.name_id}
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
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="input-dark w-full"
                    required
                  />
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Description (English)
                    </label>
                    <textarea
                      name="description_en"
                      value={formData.description_en}
                      onChange={handleChange}
                      rows={3}
                      className="input-dark w-full resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Description (Indonesian)
                    </label>
                    <textarea
                      name="description_id"
                      value={formData.description_id}
                      onChange={handleChange}
                      rows={3}
                      className="input-dark w-full resize-none"
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
                    {editingCategory ? 'Update Category' : 'Create Category'}
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
