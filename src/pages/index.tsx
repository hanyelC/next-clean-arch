import { http } from '@/utils/http'
import { Product } from '@/utils/models'
import { GetServerSideProps, NextPage } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  products: Product[]
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
  const { data: products } = await http.get('/products')
  
  return {
    props: {
      products
    }
  }
}