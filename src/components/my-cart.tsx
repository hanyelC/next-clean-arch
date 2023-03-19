import { useCart } from '@/context/cart.provider'
import React from 'react'

const MyCart = () => {
  const { cart } = useCart()
  
  return (
    <nav>
      Cart - Total {cart.total} | items {cart.products.length}
    </nav>
  )
}

export default MyCart