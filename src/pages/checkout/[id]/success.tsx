import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { GetOrderUseCase } from '@core/application/order/get-order.use-case'
import { Order } from '@core/domain/entities/order'
import { container, Registry } from '@core/infra/container-registry'

type CheckoutSuccessPageProps = {
  order: Order
}

const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({
  order
}) => {
  return (
    <div>
      <h3>Parabéns sua compra ID foi efetivada</h3>
      <ul>
        {order.products.map((product, key) => (
          <li key={key}>
            Product {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckoutSuccessPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [
      { params: { id: '9'} }
    ]
  }  
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {}

  const getOrderUseCase = container.get<GetOrderUseCase>(Registry.GetOrderUseCase)
  const order = await getOrderUseCase.execute(+id!)

  return {
    props: {
      order: order.toJSON()
    }
  }
}
