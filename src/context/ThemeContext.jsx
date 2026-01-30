import { createContext, useContext, useState, useEffect } from 'react'
import { settingsService } from '@services/api'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  // Load settings from Supabase
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await settingsService.getAll()
      setSettings(data)
      applyThemeColors(data)
    } catch (error) {
      console.error('Error loading settings:', error)
      // Use default settings if Supabase fails
      applyThemeColors({})
    } finally {
      setLoading(false)
    }
  }

  // Apply theme colors to CSS variables
  const applyThemeColors = (data) => {
    const root = document.documentElement
    
    // Primary colors
    if (data.primary_color) {
      root.style.setProperty('--color-neon', data.primary_color)
      root.style.setProperty('--color-neon-glow', `${data.primary_color}80`)
    }
    
    if (data.primary_color_50) root.style.setProperty('--color-primary-50', data.primary_color_50)
    if (data.primary_color_100) root.style.setProperty('--color-primary-100', data.primary_color_100)
    if (data.primary_color_200) root.style.setProperty('--color-primary-200', data.primary_color_200)
    if (data.primary_color_300) root.style.setProperty('--color-primary-300', data.primary_color_300)
    if (data.primary_color_400) root.style.setProperty('--color-primary-400', data.primary_color_400)
    if (data.primary_color_500) root.style.setProperty('--color-primary-500', data.primary_color_500)
    if (data.primary_color_600) root.style.setProperty('--color-primary-600', data.primary_color_600)
    if (data.primary_color_700) root.style.setProperty('--color-primary-700', data.primary_color_700)
    if (data.primary_color_800) root.style.setProperty('--color-primary-800', data.primary_color_800)
    if (data.primary_color_900) root.style.setProperty('--color-primary-900', data.primary_color_900)
  }

  const updateSettings = async (newSettings) => {
    try {
      await settingsService.updateMultiple(newSettings)
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)
      applyThemeColors(updatedSettings)
      return true
    } catch (error) {
      console.error('Error updating settings:', error)
      return false
    }
  }

  const value = {
    settings,
    loading,
    updateSettings,
    reloadSettings: loadSettings,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
