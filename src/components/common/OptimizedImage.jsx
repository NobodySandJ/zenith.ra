import { useState, useRef, useEffect } from 'react'

/**
 * OptimizedImage - Lazy loading image component with blur-up effect
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional CSS classes
 * @param {string} placeholderColor - Background color while loading
 * @param {boolean} eager - Load immediately instead of lazy
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = 'bg-dark-800',
  eager = false,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(eager)
  const [error, setError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (eager) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [eager])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${placeholderColor} ${className}`}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800" />
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  )
}

/**
 * Preload critical images
 * Call this for above-the-fold images
 */
export function preloadImage(src) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(baseUrl, widths = [320, 640, 768, 1024, 1280]) {
  return widths
    .map(w => `${baseUrl}?w=${w} ${w}w`)
    .join(', ')
}

/**
 * Get optimized image URL (for services like Unsplash, Cloudinary)
 */
export function getOptimizedUrl(url, { width = 800, quality = 80, format = 'auto' } = {}) {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?w=${width}&q=${quality}&fm=webp&fit=crop`
  }
  
  // Return original URL if not a supported service
  return url
}
