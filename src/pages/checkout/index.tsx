import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'

import { useCart } from '@/context/cart.provider'
import { ProcessOrderUseCase } from '@core/application/order/process-order.use-case'
import { container, Registry } from '@core/infra/container-registry'

const CheckoutPage: NextPage = () => {
  const cartContext = useCart()
  
  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const creditCardNumber = event.currentTarget.credit_card_number.value

    const processOrderUseCase = container.get<ProcessOrderUseCase>(
      Registry.ProcessOrderUseCase
    )

    const order = await processOrderUseCase.execute({
      credit_card_number: creditCardNumber,
      products: cartContext.cart.products,
    })

    cartContext.reload()
    
    router.push(`/checkout/${order.id}/success`)
  }

  return (
    <div>
      <h3>Meu carrinho</h3>
      <ul>
        {cartContext.cart.products.map((product, key) => (
          <li key={key}>
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
