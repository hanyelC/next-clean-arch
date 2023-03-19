import { http } from '@/utils/http'
import { Order } from '@/utils/models'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

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
        {order.products.map((product) => (
          <li key={product.id}>
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
    fallback: true,
    paths: [
      { params: { id: '1'} }
    ]
  }  
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {}
  
  const { data: order } = await http.get(`/orders/${id}`)

  return {
    props: { order }
  }
}
