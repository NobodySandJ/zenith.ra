import { motion } from 'framer-motion'

// Base skeleton with shimmer effect
const shimmer = {
  initial: { x: '-100%' },
  animate: { x: '100%' },
  transition: { 
    repeat: Infinity, 
    duration: 1.5, 
    ease: 'linear' 
  }
}

export function SkeletonBase({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-dark-800 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-700/50 to-transparent"
        initial={shimmer.initial}
        animate={shimmer.animate}
        transition={shimmer.transition}
      />
    </div>
  )
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="card-dark overflow-hidden">
      {/* Image */}
      <SkeletonBase className="aspect-square" />
      
      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <SkeletonBase className="h-5 rounded-lg w-3/4" />
        
        {/* Description */}
        <SkeletonBase className="h-4 rounded-lg w-full" />
        <SkeletonBase className="h-4 rounded-lg w-2/3" />
        
        {/* Price */}
        <div className="flex items-center gap-2 pt-2">
          <SkeletonBase className="h-6 rounded-lg w-24" />
          <SkeletonBase className="h-4 rounded-lg w-16" />
        </div>
      </div>
    </div>
  )
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Product Detail Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <SkeletonBase className="aspect-square rounded-2xl mb-4" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBase key={i} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-6">
        <div>
          <SkeletonBase className="h-4 rounded w-24 mb-3" />
          <SkeletonBase className="h-10 rounded-lg w-3/4 mb-2" />
          <SkeletonBase className="h-8 rounded-lg w-32" />
        </div>

        <div className="space-y-2">
          <SkeletonBase className="h-4 rounded w-full" />
          <SkeletonBase className="h-4 rounded w-5/6" />
          <SkeletonBase className="h-4 rounded w-4/6" />
        </div>

        <div>
          <SkeletonBase className="h-5 rounded w-16 mb-3" />
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBase key={i} className="w-12 h-12 rounded-lg" />
            ))}
          </div>
        </div>

        <div>
          <SkeletonBase className="h-5 rounded w-16 mb-3" />
          <div className="flex gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonBase key={i} className="w-10 h-10 rounded-full" />
            ))}
          </div>
        </div>

        <SkeletonBase className="h-14 rounded-lg w-full" />
      </div>
    </div>
  )
}

// Category Sidebar Skeleton
export function CategorySidebarSkeleton() {
  return (
    <div className="card-dark p-6 space-y-4">
      <SkeletonBase className="h-6 rounded w-1/2" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBase key={i} className="h-10 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <SkeletonBase className="w-12 h-12 rounded-xl" />
            <SkeletonBase className="w-16 h-6 rounded" />
          </div>
          <SkeletonBase className="h-8 rounded w-2/3 mb-2" />
          <SkeletonBase className="h-4 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

// Chart Skeleton
export function ChartSkeleton() {
  return (
    <div className="card-dark p-6">
      <div className="flex items-center justify-between mb-6">
        <SkeletonBase className="h-6 rounded w-32" />
        <SkeletonBase className="h-8 rounded w-24" />
      </div>
      <SkeletonBase className="h-64 rounded-lg" />
    </div>
  )
}

// Table Row Skeleton
export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b border-dark-700">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <SkeletonBase className="h-5 rounded w-full" />
        </td>
      ))}
    </tr>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="card-dark overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-4 text-left">
                  <SkeletonBase className="h-4 rounded w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRowSkeleton key={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Testimonial Skeleton
export function TestimonialSkeleton() {
  return (
    <div className="card-dark p-6">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBase key={i} className="w-5 h-5 rounded" />
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <SkeletonBase className="h-4 rounded w-full" />
        <SkeletonBase className="h-4 rounded w-5/6" />
        <SkeletonBase className="h-4 rounded w-4/6" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBase className="w-10 h-10 rounded-full" />
        <div className="space-y-1">
          <SkeletonBase className="h-4 rounded w-24" />
          <SkeletonBase className="h-3 rounded w-16" />
        </div>
      </div>
    </div>
  )
}

// Contact Info Skeleton
export function ContactInfoSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <SkeletonBase className="w-12 h-12 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBase className="h-4 rounded w-20" />
            <SkeletonBase className="h-5 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Text Line Skeleton
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase 
          key={i} 
          className={`h-4 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} 
        />
      ))}
    </div>
  )
}

// Avatar Skeleton
export function AvatarSkeleton({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  return <SkeletonBase className={`${sizes[size]} rounded-full`} />
}

// Button Skeleton
export function ButtonSkeleton({ width = 'w-32', height = 'h-12' }) {
  return <SkeletonBase className={`${width} ${height} rounded-lg`} />
}

// Image Skeleton
export function ImageSkeleton({ aspectRatio = 'aspect-square', className = '' }) {
  return <SkeletonBase className={`${aspectRatio} rounded-lg ${className}`} />
}

export default {
  Base: SkeletonBase,
  ProductCard: ProductCardSkeleton,
  ProductGrid: ProductGridSkeleton,
  ProductDetail: ProductDetailSkeleton,
  CategorySidebar: CategorySidebarSkeleton,
  DashboardStats: DashboardStatsSkeleton,
  Chart: ChartSkeleton,
  Table: TableSkeleton,
  TableRow: TableRowSkeleton,
  Testimonial: TestimonialSkeleton,
  ContactInfo: ContactInfoSkeleton,
  Text: TextSkeleton,
  Avatar: AvatarSkeleton,
  Button: ButtonSkeleton,
  Image: ImageSkeleton
}
