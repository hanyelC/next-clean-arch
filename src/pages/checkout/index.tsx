import { useCart } from '@/context/cart.provider'
import { http } from '@/utils/http'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'

const CheckoutPage: NextPage = () => {
  const { products } = useCart()
  
  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const creditCardNumber = event.currentTarget.credit_card_number.value

    const { data: order } = await http.post('/orders', {
      products,
      credit_card_number: creditCardNumber
    })

    router.push(`/checkout/${order.id}/success`)
  }

  return (
    <div>
      <h3>Meu carrinho</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            Product {product.name} - {product.price}
          </li>
        ))}
      </ul>
      
      <form onSubmit={onSubmit}>
        <div>
          <label>Cartão de crédito</label>
          <input
            type="text"
            name="credit_card_number"
            id="credit_card_number"
          />
        </div>
        <div>
          <button type="submit">Comprar</button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
