import { Order } from '@core/domain/entities/order'
import { Product } from '@core/domain/entities/product'
import { CartGateway } from '@core/domain/gateways/cart.gateway'
import { OrderGateway } from '@core/domain/gateways/order.gateway'

interface ProcessOrderUseCaseRequest {
  products: Product[]
  credit_card_number: string
}

export class ProcessOrderUseCase {
  constructor(
    private orderGateway: OrderGateway,
    private cartGateway: CartGateway
  ) { }

  async execute({
    products,
    credit_card_number
  }: ProcessOrderUseCaseRequest) {
    const order = new Order({
      credit_card_number,
      products
    })

    const newOrder = await this.orderGateway.insert(order)

    const cart = await this.cartGateway.get()
    cart.clear()
    await this.cartGateway.save(cart)

    return newOrder
  }
}