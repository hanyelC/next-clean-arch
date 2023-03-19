import { Product } from '@/utils/models'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type CartContextType = {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  clear: () => void
  total: number
}

const defaultContext: CartContextType = {
  addProduct: () => {},
  clear: () => {},
  products: [],
  removeProduct: () => {},
  total: 0
}

export const CartContext = createContext(defaultContext)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[] | null>(null)

  const addProduct = useCallback((product: Product) => {
    setProducts((state) => [...(state ?? []), product])
  }, [])

  const removeProduct = useCallback((product: Product) => {
    setProducts((state) => (state ?? []).filter((item) => item.id !== product.id ))
  }, [])

  const clear = useCallback(() => {
    setProducts([])
  }, [])

  const total = useMemo(
    () => {
      if (!products) return 0

      return products.reduce((acc, product) => acc + product.price, 0)
    },
    [products]
  )

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products') || '[]'))
  }, [])

  useEffect(() => {
    if (!products) return

    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  return (
    <CartContext.Provider
      value={{
        addProduct,
        clear,
        products: products ?? [],
        removeProduct,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
