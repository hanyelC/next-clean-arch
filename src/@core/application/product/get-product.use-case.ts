import { Product } from '@core/domain/entities/product'
import { ProductGateway } from '@core/domain/gateways/product.gateway'

export class GetProductUseCase {
  constructor(private productGateway: ProductGateway) {}

  async execute(id: number): Promise<Product> {
    return await this.productGateway.findById(id)
  }
}