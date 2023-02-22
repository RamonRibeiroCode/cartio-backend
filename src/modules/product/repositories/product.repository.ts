import { CreateProductInput } from '../dto/inputs/create-product.input'
import { Product } from '../entities/product.entity'

export abstract class ProductRepository {
  abstract create(createProductInput: CreateProductInput): Promise<Product>
}
