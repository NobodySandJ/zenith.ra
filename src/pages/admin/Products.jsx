import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePhotograph,
  HiOutlineX,
  HiOutlineEye
} from 'react-icons/hi'

export default function AdminProducts() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name_en: '',
    name_id: '',
    slug: '',
    description_en: '',
    description_id: '',
    price: '',
    sale_price: '',
    category_id: '',
    is_featured: false,
    is_active: true,
    images: []
  })

  // Dummy categories
  const categories = [
    { id: 1, name: 'T-Shirts' },
    { id: 2, name: 'Hoodies' },
    { id: 3, name: 'Accessories' },
    { id: 4, name: 'Limited Edition' }
  ]

  // Dummy products
  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        name_en: 'Dr. Doom Signature Tee',
        name_id: 'Kaos Signature Dr. Doom',
        slug: 'dr-doom-signature-tee',
        description_en: 'The ultimate villain-inspired streetwear',
        description_id: 'Streetwear terinspirasi villain terhebat',
        price: 49.99,
        sale_price: null,
        category: { id: 1, name: 'T-Shirts' },
        is_featured: true,
        is_active: true,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'],
        created_at: '2024-01-15'
      },
      {
        id: 2,
        name_en: 'Neon Cyber Hoodie',
        name_id: 'Hoodie Cyber Neon',
        slug: 'neon-cyber-hoodie',
        description_en: 'Futuristic neon accents for the bold',
        description_id: 'Aksen neon futuristik untuk yang berani',
        price: 89.99,
        sale_price: 79.99,
        category: { id: 2, name: 'Hoodies' },
        is_featured: true,
        is_active: true,
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300'],
        created_at: '2024-01-14'
      },
      {
        id: 3,
        name_en: 'Zenith Classic Black',
        name_id: 'Zenith Klasik Hitam',
        slug: 'zenith-classic-black',
        description_en: 'Timeless elegance in pure black',
        description_id: 'Elegan abadi dalam hitam murni',
        price: 39.99,
        sale_price: null,
        category: { id: 1, name: 'T-Shirts' },
        is_featured: false,
        is_active: true,
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300'],
        created_at: '2024-01-13'
      },
      {
        id: 4,
        name_en: 'Latverian Elite Edition',
        name_id: 'Edisi Elite Latverian',
        slug: 'latverian-elite-edition',
        description_en: 'Premium limited collection',
        description_id: 'Koleksi premium terbatas',
        price: 79.99,
        sale_price: null,
        category: { id: 4, name: 'Limited Edition' },
        is_featured: true,
        is_active: true,
        images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300'],
        created_at: '2024-01-12'
      },
      {
        id: 5,
        name_en: 'Urban Warrior Tee',
        name_id: 'Kaos Pejuang Urban',
        slug: 'urban-warrior-tee',
        description_en: 'Street-ready attitude',
        description_id: 'Sikap siap jalanan',
        price: 44.99,
        sale_price: 34.99,
        category: { id: 1, name: 'T-Shirts' },
        is_featured: false,
        is_active: false,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300'],
        created_at: '2024-01-11'
      }
    ]
    
    setTimeout(() => {
      setProducts(dummyProducts)
      setLoading(false)
    }, 500)
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.name_id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category.id === parseInt(categoryFilter)
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name_en: product.name_en,
        name_id: product.name_id,
        slug: product.slug,
        description_en: product.description_en,
        description_id: product.description_id,
        price: product.price,
        sale_price: product.sale_price || '',
        category_id: product.category.id,
        is_featured: product.is_featured,
        is_active: product.is_active,
        images: product.images
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name_en: '',
        name_id: '',
        slug: '',
        description_en: '',
        description_id: '',
        price: '',
        sale_price: '',
        category_id: '',
        is_featured: false,
        is_active: true,
        images: []
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-generate slug from English name
    if (name === 'name_en') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, category: categories.find(c => c.id === parseInt(formData.category_id)) }
          : p
      ))
      toast.success(t('admin.products.updateSuccess'))
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        category: categories.find(c => c.id === parseInt(formData.category_id)),
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'],
        created_at: new Date().toISOString().split('T')[0]
      }
      setProducts(prev => [newProduct, ...prev])
      toast.success(t('admin.products.createSuccess'))
    }
    
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm(t('admin.products.deleteConfirm'))) {
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success(t('admin.products.deleteSuccess'))
    }
  }

  const toggleStatus = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, is_active: !p.is_active } : p
    ))
    toast.success(t('admin.products.statusUpdated'))
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
          <h1 className="text-2xl font-bold text-white">{t('admin.products.title')}</h1>
          <p className="text-gray-500">{t('admin.products.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-neon flex items-center gap-2"
        >
          <HiOutlinePlus className="w-5 h-5" />
          {t('admin.products.addNew')}
        </button>
      </div>

      {/* Filters */}
      <div className="card-dark p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('admin.products.searchPlaceholder')}
              className="input-dark pl-12 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <HiOutlineFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-dark pl-12 pr-10 appearance-none cursor-pointer"
            >
              <option value="all">{t('admin.products.allCategories')}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-dark-700">
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-right p-4 font-medium">Price</th>
                <th className="text-center p-4 font-medium">Featured</th>
                <th className="text-center p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-dark-800/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name_en}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-white font-medium group-hover:text-primary-500 transition-colors">
                          {product.name_en}
                        </p>
                        <p className="text-gray-500 text-sm">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-dark-700 rounded text-sm text-gray-400">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {product.sale_price ? (
                      <div>
                        <span className="text-primary-500 font-medium">${product.sale_price}</span>
                        <span className="text-gray-600 line-through text-sm ml-2">${product.price}</span>
                      </div>
                    ) : (
                      <span className="text-white">${product.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`w-2 h-2 rounded-full inline-block ${
                      product.is_featured ? 'bg-primary-500' : 'bg-gray-600'
                    }`} />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleStatus(product.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.is_active
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                        className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                        title="View"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <HiOutlinePhotograph className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">{t('admin.products.noProducts')}</p>
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
              className="bg-dark-900 border border-dark-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold text-white">
                  {editingProduct ? t('admin.products.editProduct') : t('admin.products.addProduct')}
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
                  <p className="text-gray-500 text-sm mt-1">Auto-generated from English name</p>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Prices */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sale Price ($)
                    </label>
                    <input
                      type="number"
                      name="sale_price"
                      value={formData.sale_price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Category *
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="input-dark w-full"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload Placeholder */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                    <HiOutlinePhotograph className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-gray-600 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                        className="form-checkbox bg-dark-800 border-dark-600 text-primary-500 rounded focus:ring-primary-500"
                      />
                      <span className="text-white">Featured Product (Showcase)</span>
                    </label>
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
                  </div>
                  <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                    <p className="text-primary-500 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Featured products</strong> akan muncul di halaman Showcase Eksklusif (tanpa harga, hanya untuk promosi)</span>
                    </p>
                  </div>
                </div>

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
                    {editingProduct ? 'Update Product' : 'Create Product'}
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
