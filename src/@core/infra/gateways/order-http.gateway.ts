import { AxiosInstance } from 'axios'

import { Order } from '@core/domain/entities/order'
import { Product } from '@core/domain/entities/product'
import { OrderGateway } from '@core/domain/gateways/order.gateway'

export class OrderHttpGateway implements OrderGateway {
  constructor(private readonly http: AxiosInstance) { }

  async insert(order: Order): Promise<Order> {
    const { data } = await this.http.post('/orders', order.toJSON())

    order.id = data.id

    return order
  }

  async findById(id: number): Promise<Order> {
    const { data } = await this.http.get(`/orders/${id}`)

    const order = new Order({
      id: data.id,
      products: data.products.map(
        (product: any) =>
          new Product({
            ...product
          })
      ),
      credit_card_number: data.credit_card_number,
    })

    return order
  }
}