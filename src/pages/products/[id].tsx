import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useCart } from '@/context/cart.provider'
import { GetProductUseCase } from '@core/application/product/get-product.use-case'
import { Product, ProductProps } from '@core/domain/entities/product'
import { container, Registry } from '@core/infra/container-registry'

type ProductDetailPageProps = {
  product: ProductProps
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const { addProduct } = useCart()

  const { isFallback } = useRouter()
  
  if (isFallback) return <p>Loading...</p>

  const productEntity = new Product({ ...product })
  
  return (
    <div>
      <h3>{productEntity.name}</h3>
      <label>Preço</label> {productEntity.price}
      <button onClick={() => addProduct(productEntity)}>
        Adicionar no carrinho
      </button>
    </div>
  )
}

export default ProductDetailPage

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
 
  const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase)

  const product = await useCase.execute(+id!)
  
  return {
    props: {
      product: product.toJSON()
    }
  }
}