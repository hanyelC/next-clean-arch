import { NextPage } from 'next'
import { FormEvent } from 'react'

const CheckoutPage: NextPage = () => {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }
  
  return (
    <div>
      <h3>Meu carrinho</h3>
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
