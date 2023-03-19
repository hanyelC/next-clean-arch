import { Order } from '@core/domain/entities/order'
import { OrderGateway } from '@core/domain/gateways/order.gateway'

export class GetOrderUseCase {
  constructor(private orderGateway: OrderGateway) {}

  async execute(id: number): Promise<Order> {
    return this.orderGateway.findById(id)
  }
}
