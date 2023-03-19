import { useCart } from '@/context/cart.provider'
import React from 'react'

const MyCart = () => {
  const { products, total } = useCart()
  
  return (
    <nav>
      Cart - Total {total} | items {products.length}
    </nav>
  )
}

export default MyCart