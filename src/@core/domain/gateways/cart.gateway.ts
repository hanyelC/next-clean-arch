import { Cart } from '@core/domain/entities/cart'

export interface CartGateway {
  get(): Promise<Cart>
  save(cart: Cart): Promise<void>
}