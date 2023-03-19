import { Cart } from '@core/domain/entities/cart'
import { Product } from '@core/domain/entities/product'
import { CartGateway } from '@core/domain/gateways/cart.gateway'

export class AddProductInCartUseCase {
  constructor(private cartGateway: CartGateway) {}
  
  async execute(product: Product): Promise<Cart> {
    const cart = await this.cartGateway.get()
    cart.addProduct(product)
    this.cartGateway.save(cart)
    return cart
  }
}