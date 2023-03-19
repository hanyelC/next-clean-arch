import { AxiosInstance } from 'axios'

import { Product } from '@core/domain/entities/product'
import { ProductGateway } from '@core/domain/gateways/product.gateway'

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}
  
  async findAll(): Promise<Product[]> {
    const { data } = await this.http.get<Product[]>('/products')

    return data.map((item) => new Product(item))
  }

  async findById(id: number): Promise<Product> {
    const { data } = await this.http.get<Product>(`/products/${id}`)

    return new Product(data)
  }

}