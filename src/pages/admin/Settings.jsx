import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  HiOutlineCog,
  HiOutlineColorSwatch,
  HiOutlinePhotograph,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineSave,
  HiOutlineRefresh
} from 'react-icons/hi'
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa'
import { useTheme } from '@context/ThemeContext'

export default function AdminSettings() {
  const { t } = useTranslation()
  const { settings: currentSettings, updateSettings } = useTheme()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General
    site_name: 'Zenith.ra',
    tagline_en: 'Unleash Your Inner Doom',
    tagline_id: 'Keluarkan Doom Dalam Dirimu',
    logo_url: '',
    favicon_url: '',
    
    // Theme
    primary_color: '#39ff14',
    secondary_color: '#00d4ff',
    accent_color: '#ff6b6b',
    background_color: '#0a0a0a',
    
    // Contact
    email: 'contact@zenith-ra.com',
    phone: '+1 234 567 8900',
    whatsapp: '+1 234 567 8900',
    address_en: '123 Fashion Street, New York, NY 10001, USA',
    address_id: '123 Jalan Fashion, New York, NY 10001, USA',
    
    // Social
    instagram: 'https://instagram.com/zenith.ra',
    twitter: 'https://twitter.com/zenith_ra',
    facebook: 'https://facebook.com/zenithra',
    tiktok: 'https://tiktok.com/@zenith.ra',
    youtube: 'https://youtube.com/@zenith.ra',
    
    // SEO
    meta_title_en: 'Zenith.ra - Premium Streetwear',
    meta_title_id: 'Zenith.ra - Streetwear Premium',
    meta_description_en: 'Discover premium streetwear inspired by power and elegance. Shop the Dr. Doom collection and more.',
    meta_description_id: 'Temukan streetwear premium yang terinspirasi oleh kekuatan dan elegan. Belanja koleksi Dr. Doom dan lainnya.',
    meta_keywords_en: 'streetwear, fashion, dr doom, premium clothing, t-shirts, hoodies',
    meta_keywords_id: 'streetwear, fashion, dr doom, pakaian premium, kaos, hoodie',
    
    // Other
    currency: 'USD',
    currency_symbol: '$',
    shipping_fee: 10,
    free_shipping_threshold: 100,
    maintenance_mode: false
  })

  useEffect(() => {
    // Load from current settings if available
    if (currentSettings) {
      setSettings(prev => ({ ...prev, ...currentSettings }))
    }
  }, [currentSettings])

  const tabs = [
    { id: 'general', label: 'General', icon: HiOutlineCog },
    { id: 'theme', label: 'Theme', icon: HiOutlineColorSwatch },
    { id: 'contact', label: 'Contact', icon: HiOutlineMail },
    { id: 'social', label: 'Social Media', icon: HiOutlineGlobeAlt },
    { id: 'seo', label: 'SEO', icon: HiOutlineGlobeAlt }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update theme context
      updateSettings(settings)
      
      toast.success(t('admin.settings.saveSuccess'))
    } catch (error) {
      toast.error(t('admin.settings.saveError'))
    }
    
    setLoading(false)
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        site_name: 'Zenith.ra',
        tagline_en: 'Unleash Your Inner Doom',
        tagline_id: 'Keluarkan Doom Dalam Dirimu',
        logo_url: '',
        favicon_url: '',
        primary_color: '#39ff14',
        secondary_color: '#00d4ff',
        accent_color: '#ff6b6b',
        background_color: '#0a0a0a',
        email: 'contact@zenith-ra.com',
        phone: '+1 234 567 8900',
        whatsapp: '+1 234 567 8900',
        address_en: '123 Fashion Street, New York, NY 10001, USA',
        address_id: '123 Jalan Fashion, New York, NY 10001, USA',
        instagram: '',
        twitter: '',
        facebook: '',
        tiktok: '',
        youtube: '',
        meta_title_en: 'Zenith.ra - Premium Streetwear',
        meta_title_id: 'Zenith.ra - Streetwear Premium',
        meta_description_en: '',
        meta_description_id: '',
        meta_keywords_en: '',
        meta_keywords_id: '',
        currency: 'USD',
        currency_symbol: '$',
        shipping_fee: 10,
        free_shipping_threshold: 100,
        maintenance_mode: false
      })
      toast.success('Settings reset to default')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Site Name</label>
              <input
                type="text"
                name="site_name"
                value={settings.site_name}
                onChange={handleChange}
                className="input-dark w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Tagline (English)</label>
                <input
                  type="text"
                  name="tagline_en"
                  value={settings.tagline_en}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Tagline (Indonesian)</label>
                <input
                  type="text"
                  name="tagline_id"
                  value={settings.tagline_id}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Logo URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="logo_url"
                    value={settings.logo_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="input-dark flex-1"
                  />
                  <button className="btn-outline px-4">
                    <HiOutlinePhotograph className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Favicon URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="favicon_url"
                    value={settings.favicon_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="input-dark flex-1"
                  />
                  <button className="btn-outline px-4">
                    <HiOutlinePhotograph className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Currency</label>
                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="input-dark w-full"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Shipping Fee</label>
                <input
                  type="number"
                  name="shipping_fee"
                  value={settings.shipping_fee}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Free Shipping Above</label>
                <input
                  type="number"
                  name="free_shipping_threshold"
                  value={settings.free_shipping_threshold}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="input-dark w-full"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-dark-800 rounded-lg">
              <input
                type="checkbox"
                name="maintenance_mode"
                checked={settings.maintenance_mode}
                onChange={handleChange}
                className="form-checkbox bg-dark-800 border-dark-600 text-primary-500 rounded focus:ring-primary-500 w-5 h-5"
              />
              <div>
                <span className="text-white font-medium">Maintenance Mode</span>
                <p className="text-gray-500 text-sm">Enable to show maintenance page to visitors</p>
              </div>
            </label>
          </div>
        )

      case 'theme':
        return (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm mb-4">
              Customize the color scheme of your website. Changes will apply to all pages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Primary Color (Neon)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="primary_color"
                    value={settings.primary_color}
                    onChange={handleChange}
                    className="w-12 h-12 rounded-lg border-2 border-dark-600 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    name="primary_color"
                    value={settings.primary_color}
                    onChange={handleChange}
                    className="input-dark flex-1"
                  />
                </div>
                <div
                  className="mt-2 h-8 rounded-lg"
                  style={{ backgroundColor: settings.primary_color }}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Secondary Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="secondary_color"
                    value={settings.secondary_color}
                    onChange={handleChange}
                    className="w-12 h-12 rounded-lg border-2 border-dark-600 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    name="secondary_color"
                    value={settings.secondary_color}
                    onChange={handleChange}
                    className="input-dark flex-1"
                  />
                </div>
                <div
                  className="mt-2 h-8 rounded-lg"
                  style={{ backgroundColor: settings.secondary_color }}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Accent Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="accent_color"
                    value={settings.accent_color}
                    onChange={handleChange}
                    className="w-12 h-12 rounded-lg border-2 border-dark-600 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    name="accent_color"
                    value={settings.accent_color}
                    onChange={handleChange}
                    className="input-dark flex-1"
                  />
                </div>
                <div
                  className="mt-2 h-8 rounded-lg"
                  style={{ backgroundColor: settings.accent_color }}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Background Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="background_color"
                    value={settings.background_color}
                    onChange={handleChange}
                    className="w-12 h-12 rounded-lg border-2 border-dark-600 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    name="background_color"
                    value={settings.background_color}
                    onChange={handleChange}
                    className="input-dark flex-1"
                  />
                </div>
                <div
                  className="mt-2 h-8 rounded-lg border border-dark-600"
                  style={{ backgroundColor: settings.background_color }}
                />
              </div>
            </div>

            {/* Theme Preview */}
            <div className="p-6 rounded-lg border border-dark-700" style={{ backgroundColor: settings.background_color }}>
              <h4 className="text-lg font-bold mb-4" style={{ color: settings.primary_color }}>
                Theme Preview
              </h4>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: settings.primary_color, color: settings.background_color }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: settings.secondary_color, color: settings.background_color }}
                >
                  Secondary
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium border-2"
                  style={{ borderColor: settings.primary_color, color: settings.primary_color }}
                >
                  Outline
                </button>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  <HiOutlineMail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  <HiOutlinePhone className="w-4 h-4 inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="input-dark w-full"
                placeholder="+1234567890"
              />
              <p className="text-gray-500 text-sm mt-1">Include country code without spaces</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  <HiOutlineLocationMarker className="w-4 h-4 inline mr-2" />
                  Address (English)
                </label>
                <textarea
                  name="address_en"
                  value={settings.address_en}
                  onChange={handleChange}
                  rows={3}
                  className="input-dark w-full resize-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  <HiOutlineLocationMarker className="w-4 h-4 inline mr-2" />
                  Address (Indonesian)
                </label>
                <textarea
                  name="address_id"
                  value={settings.address_id}
                  onChange={handleChange}
                  rows={3}
                  className="input-dark w-full resize-none"
                />
              </div>
            </div>
          </div>
        )

      case 'social':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                <FaInstagram className="w-4 h-4 inline mr-2 text-pink-500" />
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <FaTwitter className="w-4 h-4 inline mr-2 text-blue-400" />
                Twitter / X
              </label>
              <input
                type="url"
                name="twitter"
                value={settings.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <FaFacebookF className="w-4 h-4 inline mr-2 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/pagename"
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <FaTiktok className="w-4 h-4 inline mr-2" />
                TikTok
              </label>
              <input
                type="url"
                name="tiktok"
                value={settings.tiktok}
                onChange={handleChange}
                placeholder="https://tiktok.com/@username"
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <FaYoutube className="w-4 h-4 inline mr-2 text-red-500" />
                YouTube
              </label>
              <input
                type="url"
                name="youtube"
                value={settings.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@username"
                className="input-dark w-full"
              />
            </div>
          </div>
        )

      case 'seo':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Meta Title (English)</label>
                <input
                  type="text"
                  name="meta_title_en"
                  value={settings.meta_title_en}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Meta Title (Indonesian)</label>
                <input
                  type="text"
                  name="meta_title_id"
                  value={settings.meta_title_id}
                  onChange={handleChange}
                  className="input-dark w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Meta Description (English)</label>
                <textarea
                  name="meta_description_en"
                  value={settings.meta_description_en}
                  onChange={handleChange}
                  rows={3}
                  className="input-dark w-full resize-none"
                />
                <p className="text-gray-500 text-sm mt-1">{settings.meta_description_en.length}/160 characters</p>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Meta Description (Indonesian)</label>
                <textarea
                  name="meta_description_id"
                  value={settings.meta_description_id}
                  onChange={handleChange}
                  rows={3}
                  className="input-dark w-full resize-none"
                />
                <p className="text-gray-500 text-sm mt-1">{settings.meta_description_id.length}/160 characters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Keywords (English)</label>
                <input
                  type="text"
                  name="meta_keywords_en"
                  value={settings.meta_keywords_en}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2, keyword3"
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Keywords (Indonesian)</label>
                <input
                  type="text"
                  name="meta_keywords_id"
                  value={settings.meta_keywords_id}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2, keyword3"
                  className="input-dark w-full"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('admin.settings.title')}</h1>
          <p className="text-gray-500">{t('admin.settings.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="btn-outline flex items-center gap-2"
          >
            <HiOutlineRefresh className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-neon flex items-center gap-2"
          >
            {loading ? (
              <span className="loader w-5 h-5" />
            ) : (
              <HiOutlineSave className="w-5 h-5" />
            )}
            {t('admin.settings.save')}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="card-dark p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500/10 text-primary-500 border-l-2 border-primary-500'
                    : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="card-dark p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              {tabs.find(t => t.id === activeTab)?.icon && (
                <span className="text-primary-500">
                  {(() => {
                    const Icon = tabs.find(t => t.id === activeTab)?.icon
                    return Icon ? <Icon className="w-5 h-5" /> : null
                  })()}
                </span>
              )}
              {tabs.find(t => t.id === activeTab)?.label} Settings
            </h2>
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
