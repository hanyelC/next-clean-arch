import MyCart from '@/components/my-cart'
import { CartProvider } from '@/context/cart.provider'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MyCart />
      <Component {...pageProps} />
    </CartProvider>
  )
}
