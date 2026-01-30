import supabase from './supabase'

// =====================================================
// PRODUCTS SERVICE
// =====================================================
export const productService = {
  // Get all products with filters
  async getAll({ category, search, sort, limit = 20, offset = 0 } = {}) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*),
        colors:product_colors(*)
      `)
      .eq('is_active', true)

    if (category && category !== 'all') {
      query = query.eq('categories.slug', category)
    }

    if (search) {
      query = query.or(`name_en.ilike.%${search}%,name_id.ilike.%${search}%`)
    }

    switch (sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'popular':
        query = query.order('sales_count', { ascending: false })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Get single product by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*),
        colors:product_colors(*)
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  // Get featured products
  async getFeatured(limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Get new arrivals
  async getNewArrivals(limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*)
      `)
      .eq('is_active', true)
      .eq('is_new', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Get best sellers
  async getBestSellers(limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*)
      `)
      .eq('is_active', true)
      .eq('is_bestseller', true)
      .order('sales_count', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Get related products
  async getRelated(categoryId, excludeId, limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*)
      `)
      .eq('is_active', true)
      .eq('category_id', categoryId)
      .neq('id', excludeId)
      .limit(limit)

    if (error) throw error
    return data
  },

  // Admin: Get all products (including inactive)
  async adminGetAll() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name_en, name_id, slug),
        images:product_images(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Admin: Create product
  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Update product
  async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Delete product
  async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },
}

// =====================================================
// CATEGORIES SERVICE
// =====================================================
export const categoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async adminGetAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async create(categoryData) {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id, categoryData) {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },
}

// =====================================================
// BANNERS SERVICE
// =====================================================
export const bannerService = {
  async getByPosition(position = 'hero') {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('position', position)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async adminGetAll() {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async create(bannerData) {
    const { data, error } = await supabase
      .from('banners')
      .insert(bannerData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id, bannerData) {
    const { data, error } = await supabase
      .from('banners')
      .update(bannerData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },
}

// =====================================================
// SETTINGS SERVICE
// =====================================================
export const settingsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')

    if (error) throw error
    
    // Convert to key-value object
    const settings = {}
    data.forEach(item => {
      settings[item.key] = item.value
    })
    return settings
  },

  async getByGroup(groupName) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('group_name', groupName)

    if (error) throw error
    return data
  },

  async update(key, value) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('key', key)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateMultiple(settings) {
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: String(value),
    }))

    const promises = updates.map(({ key, value }) =>
      supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key)
    )

    await Promise.all(promises)
    return true
  },
}

// =====================================================
// PAGES SERVICE (CMS)
// =====================================================
export const pageService = {
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data
  },

  async adminGetAll() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async update(id, pageData) {
    const { data, error } = await supabase
      .from('pages')
      .update(pageData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// =====================================================
// FAQ SERVICE
// =====================================================
export const faqService = {
  async getAll() {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getByCategory(category) {
    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },
}

// =====================================================
// TESTIMONIALS SERVICE
// =====================================================
export const testimonialService = {
  async getFeatured(limit = 4) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
}

// =====================================================
// STATISTICS SERVICE (For Admin Dashboard)
// =====================================================
export const statisticsService = {
  async getSalesStats(period = 'week') {
    let startDate
    const endDate = new Date().toISOString().split('T')[0]

    switch (period) {
      case 'week':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      case 'month':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      case 'year':
        startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      default:
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    const { data, error } = await supabase
      .from('sales_statistics')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })

    if (error) throw error
    return data
  },

  async getTotalStats() {
    // Get total sales
    const { data: salesData } = await supabase
      .from('sales_statistics')
      .select('total_sales, total_orders, total_items_sold')

    // Get total products
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    // Calculate totals
    const totals = salesData?.reduce(
      (acc, curr) => ({
        totalSales: acc.totalSales + Number(curr.total_sales),
        totalOrders: acc.totalOrders + curr.total_orders,
        totalItemsSold: acc.totalItemsSold + curr.total_items_sold,
      }),
      { totalSales: 0, totalOrders: 0, totalItemsSold: 0 }
    ) || { totalSales: 0, totalOrders: 0, totalItemsSold: 0 }

    return {
      ...totals,
      totalProducts: productCount || 0,
    }
  },

  async getTopProducts(limit = 5) {
    const { data, error } = await supabase
      .from('products')
      .select('id, name_en, name_id, sales_count, price')
      .order('sales_count', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },
}

// =====================================================
// CONTACT SERVICE
// =====================================================
export const contactService = {
  async sendMessage(messageData) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(messageData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async adminGetAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async markAsRead(id) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// =====================================================
// AUTH SERVICE (Simple Admin Auth)
// =====================================================
export const authService = {
  async login(email, password) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      throw new Error('Invalid credentials')
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id)

    // Store in localStorage
    const userData = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
    }
    localStorage.setItem('adminUser', JSON.stringify(userData))

    return userData
  },

  logout() {
    localStorage.removeItem('adminUser')
  },

  getCurrentUser() {
    const user = localStorage.getItem('adminUser')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return !!this.getCurrentUser()
  },
}
