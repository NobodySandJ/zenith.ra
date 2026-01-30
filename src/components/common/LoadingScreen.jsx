import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Animated Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--color-neon-glow) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <motion.h1
          className="text-4xl md:text-5xl font-display font-bold text-neon tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ZENITH.RA
        </motion.h1>

        {/* Loading Spinner */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-2 border-dark-700 rounded-full"
            style={{ borderTopColor: 'var(--color-neon)' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-transparent rounded-full"
            style={{ borderBottomColor: 'var(--color-neon)' }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="mt-6 text-gray-500 text-sm tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING...
        </motion.p>
      </div>
    </div>
  )
}
