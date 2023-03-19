import { ProductGateway } from '@core/domain/gateways/product.gateway'
import { Product } from '@core/domain/entities/product'

export class ListProductsUseCase {
  constructor(private productGateway: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return await this.productGateway.findAll()
  }
}