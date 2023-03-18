import { http } from '@/utils/http'
import { Product } from '@/utils/models'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

type ProductDetailPageProps = {
  product: Product
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const { isFallback } = useRouter()
  
  if (isFallback) return <p>Loading...</p>

  return (
    <div>
      <h3>{product.name}</h3>
      <label>Preço</label> {product.price}
      <button>Adicionar no carrinho</button>
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
  
  const { data: product } = await http.get(`/products/${id}`)
  
  return {
    props: {
      product
    }
  }
}