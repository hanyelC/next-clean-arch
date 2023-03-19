import 'reflect-metadata'
import { Container } from 'inversify'

import { AddProductInCartUseCase } from '@core/application/cart/add-product-in-cart.use-case'
import { ClearCartUseCase } from '@core/application/cart/clear-cart.use-case'
import { GetCartUseCase } from '@core/application/cart/get-cart.use-case'
import { RemoveProductFromCartUseCase } from '@core/application/cart/remove-product-from-cart.use-case'
import { GetOrderUseCase } from '@core/application/order/get-order.use-case'
import { ProcessOrderUseCase } from '@core/application/order/process-order.use-case'
import { GetProductUseCase } from '@core/application/product/get-product.use-case'
import { ListProductsUseCase } from '@core/application/product/list-products.use-case'
import { CartLocalStorageGateway } from './gateways/cart-local-storage.gateway'
import { OrderHttpGateway } from './gateways/order-http.gateway'
import { ProductHttpGateway } from './gateways/product-http.gateway'
import { http } from './http'

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  CartGateway: Symbol.for('CartGateway'),
  OrderGateway: Symbol.for('OrderGateway'),
  ProductGateway: Symbol.for('ProductGateway'),

  AddProductInCartUseCase: Symbol.for('AddProductInCartUseCase'),
  ClearCartUseCase: Symbol.for('ClearCartUseCase'),
  GetCartUseCase: Symbol.for('GetCartUseCase'),
  GetOrderUseCase: Symbol.for('GetOrderUseCase'),
  GetProductUseCase: Symbol.for('GetProductUseCase'),
  ListProductsUseCase: Symbol.for('ListProductsUseCase'),
  ProcessOrderUseCase: Symbol.for('ProcessOrderUseCase'),
  RemoveProductFromCartUseCase: Symbol.for('RemoveProductFromCartUseCase')
}

export const container = new Container()

// HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http)

// GATEWAYS
container.bind(Registry.CartGateway).to(CartLocalStorageGateway)
container.bind(Registry.OrderGateway).toDynamicValue((context) => {
  return new OrderHttpGateway(context.container.get(Registry.AxiosAdapter))
})
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
  return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter))
})

// USE CASES
container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
  return new AddProductInCartUseCase(context.container.get(Registry.CartGateway))
})
container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
  return new ClearCartUseCase(context.container.get(Registry.CartGateway))
})
container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
  return new GetCartUseCase(context.container.get(Registry.CartGateway))
})
container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue((context) => {
  return new RemoveProductFromCartUseCase(context.container.get(Registry.CartGateway))
})
container.bind(Registry.GetOrderUseCase).toDynamicValue((context) => {
  return new GetOrderUseCase(context.container.get(Registry.OrderGateway))
})
container.bind(Registry.ProcessOrderUseCase).toDynamicValue((context) => {
  return new ProcessOrderUseCase(
    context.container.get(Registry.OrderGateway),
    context.container.get(Registry.CartGateway)
  )
})
container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
  return new GetProductUseCase(context.container.get(Registry.ProductGateway))
})
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
  return new ListProductsUseCase(context.container.get(Registry.ProductGateway))
})
