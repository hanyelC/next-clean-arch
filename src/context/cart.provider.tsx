import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { AddProductInCartUseCase } from '@core/application/cart/add-product-in-cart.use-case'
import { ClearCartUseCase } from '@core/application/cart/clear-cart.use-case'
import { GetCartUseCase } from '@core/application/cart/get-cart.use-case'
import { RemoveProductFromCartUseCase } from '@core/application/cart/remove-product-from-cart.use-case'
import { Cart } from '@core/domain/entities/cart'
import { Product } from '@core/domain/entities/product'
import { container, Registry } from '@core/infra/container-registry'

export type CartContextType = {
  cart: Cart
  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
  clear: () => void
  reload: () => void
}

const defaultContext: CartContextType = {
  cart: new Cart({ products: [] }),
  addProduct: (product: Product) => {},
  clear: () => {},
  removeProduct: (productId: number) => {},
  reload: () => {}
}

export const CartContext = createContext(defaultContext)

const getCartUseCase = container.get<GetCartUseCase>(
  Registry.GetCartUseCase
)
const addProductUseCase = container.get<AddProductInCartUseCase>(
  Registry.AddProductInCartUseCase
)
const removeProductUseCase = container.get<RemoveProductFromCartUseCase>(
  Registry.RemoveProductFromCartUseCase
)
const clearProductUseCase = container.get<ClearCartUseCase>(
  Registry.ClearCartUseCase
)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(defaultContext.cart)

  const addProduct = useCallback(async (product: Product) => {
    const cart = await addProductUseCase.execute(product)
    setCart(cart)
  }, [])

  const removeProduct = useCallback(async (productId: number) => {
    const cart = await removeProductUseCase.execute(productId)
    setCart(cart)
  }, [])

  const clear = useCallback(async () => {
    const cart = await clearProductUseCase.execute()

    setCart(cart)
  }, [])

  const reload = useCallback(async () => {
    const cart = await getCartUseCase.execute()
    setCart(cart)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return (
    <CartContext.Provider
      value={{
        addProduct,
        cart,
        clear,
        removeProduct,
        reload
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
