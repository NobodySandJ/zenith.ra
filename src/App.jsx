import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'

// Context
import { ThemeProvider } from '@context/ThemeContext'
import { AuthProvider } from '@context/AuthContext'
import { CartProvider } from '@context/CartContext'

// Layouts
import PublicLayout from '@layouts/PublicLayout'
import AdminLayout from '@layouts/AdminLayout'

// Public Pages
import Home from '@pages/public/Home'
import Products from '@pages/public/Products'
import ProductDetail from '@pages/public/ProductDetail'
import About from '@pages/public/About'
import Contact from '@pages/public/Contact'
import FAQ from '@pages/public/FAQ'
import Cart from '@pages/public/Cart'

// Admin Pages
import AdminLogin from '@pages/admin/Login'
import AdminDashboard from '@pages/admin/Dashboard'
import AdminProducts from '@pages/admin/Products'
import AdminCategories from '@pages/admin/Categories'
import AdminBanners from '@pages/admin/Banners'
import AdminSettings from '@pages/admin/Settings'
import AdminPages from '@pages/admin/Pages'

// Components
import ProtectedRoute from '@components/auth/ProtectedRoute'
import LoadingScreen from '@components/common/LoadingScreen'

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: window.innerWidth < 768 ? true : false,
    })
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #39ff14',
                  boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)',
                },
                success: {
                  iconTheme: {
                    primary: '#39ff14',
                    secondary: '#0a0a0a',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff4444',
                    secondary: '#0a0a0a',
                  },
                  style: {
                    border: '1px solid #ff4444',
                    boxShadow: '0 0 20px rgba(255, 68, 68, 0.3)',
                  },
                },
              }}
            />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="cart" element={<Cart />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="banners" element={<AdminBanners />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
