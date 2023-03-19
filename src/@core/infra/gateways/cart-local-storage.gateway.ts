import { injectable } from 'inversify'

import { Cart } from '@core/domain/entities/cart'
import { CartGateway } from '@core/domain/gateways/cart.gateway'
import { Product, ProductProps } from '@core/domain/entities/product'

@injectable()
export class CartLocalStorageGateway implements CartGateway {
  private readonly CART_KEY = '@next-clean-arch:products'

  async get(): Promise<Cart> {
    const products = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]') as ProductProps[]

    return new Cart({
      products: products.map((p) => new Product({
        ...p
      }))
    })
  }

  async save(cart: Cart): Promise<void> {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products))
  }
}
