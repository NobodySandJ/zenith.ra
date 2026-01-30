import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@services/api'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    // Check for existing session
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password)
      setUser(userData)
      toast.success(t('auth.loginSuccess'))
      return true
    } catch (error) {
      toast.error(t('auth.loginError'))
      return false
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    toast.success(t('auth.logoutSuccess'))
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
