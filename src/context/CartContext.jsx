import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, size = null, color = null) => {
    const lang = i18n.language
    const productName = lang === 'id' ? product.name_id : product.name_en

    setItems(prevItems => {
      // Check if item with same product, size, and color exists
      const existingIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      )

      if (existingIndex > -1) {
        // Update quantity
        const newItems = [...prevItems]
        newItems[existingIndex].quantity += quantity
        toast.success(`${productName} - ${t('products.addedToCart')}`)
        return newItems
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          slug: product.slug,
          name_en: product.name_en,
          name_id: product.name_id,
          price: product.price,
          image: product.images?.[0]?.image_url || '/images/placeholder.jpg',
          quantity,
          selectedSize: size,
          selectedColor: color,
        }
        toast.success(`${productName} - ${t('products.addedToCart')}`)
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (index) => {
    setItems(prevItems => {
      const newItems = [...prevItems]
      newItems.splice(index, 1)
      return newItems
    })
  }

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return

    setItems(prevItems => {
      const newItems = [...prevItems]
      newItems[index].quantity = quantity
      return newItems
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
