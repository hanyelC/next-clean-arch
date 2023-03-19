import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import { ListProductsUseCase } from '@core/application/product/list-products.use-case'
import { ProductProps } from '@core/domain/entities/product'
import { container, Registry } from '@core/infra/container-registry'

type HomeProps = {
  products: ProductProps[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1>E-commerce </h1>
      <div></div>
      <ul>
        {products.map(( product) => (
          <li key={product.id}>
            <label>Nome: </label> {product.name}<Link href={`/products/${product.id}`}>Ver</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const useCase = container.get<ListProductsUseCase>(
    Registry.ListProductsUseCase
  )
  const products = await useCase.execute()

  return {
    props: {
      products: products.map((product) => product.toJSON())
    }
  }
}