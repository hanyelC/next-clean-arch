import { Cart } from '@core/domain/entities/cart'
import { CartGateway } from '@core/domain/gateways/cart.gateway'

export class GetCartUseCase {
  constructor(private cartGateway: CartGateway) {}
  
  async execute(): Promise<Cart> {
    return await this.cartGateway.get()
  }
}
