import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'

// Context
import { ThemeProvider } from '@context/ThemeContext'
import { AuthProvider } from '@context/AuthContext'
import { CartProvider } from '@context/CartContext'

// Layouts
import PublicLayout from '@layouts/PublicLayout'

// Eagerly loaded pages (critical path)
import Home from '@pages/public/Home'
import LoadingScreen from '@components/common/LoadingScreen'

// Lazy loaded pages (code splitting)
const Products = lazy(() => import('@pages/public/Products'))
const ProductDetail = lazy(() => import('@pages/public/ProductDetail'))
const About = lazy(() => import('@pages/public/About'))
const Contact = lazy(() => import('@pages/public/Contact'))
const FAQ = lazy(() => import('@pages/public/FAQ'))
const Cart = lazy(() => import('@pages/public/Cart'))

// Admin pages (lazy loaded)
const AdminLogin = lazy(() => import('@pages/admin/Login'))
const AdminLayout = lazy(() => import('@layouts/AdminLayout'))
const AdminDashboard = lazy(() => import('@pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('@pages/admin/Products'))
const AdminCategories = lazy(() => import('@pages/admin/Categories'))
const AdminBanners = lazy(() => import('@pages/admin/Banners'))
const AdminSettings = lazy(() => import('@pages/admin/Settings'))
const AdminPages = lazy(() => import('@pages/admin/Pages'))

// Components
const ProtectedRoute = lazy(() => import('@components/auth/ProtectedRoute'))

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
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
                <Route path="products" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Products />
                  </Suspense>
                } />
                <Route path="products/:slug" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <ProductDetail />
                  </Suspense>
                } />
                <Route path="about" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <About />
                  </Suspense>
                } />
                <Route path="contact" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Contact />
                  </Suspense>
                } />
                <Route path="faq" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <FAQ />
                  </Suspense>
                } />
                <Route path="cart" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Cart />
                  </Suspense>
                } />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={
                <Suspense fallback={<LoadingScreen />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  </Suspense>
                }
              >
                <Route index element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                } />
                <Route path="products" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminProducts />
                  </Suspense>
                } />
                <Route path="categories" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminCategories />
                  </Suspense>
                } />
                <Route path="banners" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminBanners />
                  </Suspense>
                } />
                <Route path="pages" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminPages />
                  </Suspense>
                } />
                <Route path="settings" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminSettings />
                  </Suspense>
                } />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
