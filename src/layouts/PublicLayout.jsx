import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import CartSidebar from '@components/cart/CartSidebar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}
