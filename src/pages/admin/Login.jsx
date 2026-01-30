import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { useAuth } from '@context/AuthContext'

export default function AdminLogin() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(formData.email, formData.password)
    
    if (success) {
      navigate('/admin')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 grid-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <div className="card-dark p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-neon tracking-wider mb-2">
              ZENITH.RA
            </h1>
            <p className="text-gray-500">Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <HiOutlineMail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@zenith-ra.com"
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-all duration-300 h-12 pl-12 pr-4"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <HiOutlineLockClosed className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-all duration-300 h-12 pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="loader w-5 h-5 mr-2" />
                  {t('auth.loggingIn')}
                </>
              ) : (
                t('auth.loginButton')
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-800/50 rounded-lg border border-dark-700">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Email:</span>
                <span className="text-primary-500 text-sm font-mono">zenith@ra.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Password:</span>
                <span className="text-primary-500 text-sm font-mono">jayajayajaya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <p className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
            ← Back to Website
          </a>
        </p>
      </motion.div>
    </div>
  )
}
