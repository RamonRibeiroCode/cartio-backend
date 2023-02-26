import { CreateProductInputWithSlug } from '../dto/inputs/create-product.input'
import { Category } from '../entities/category.entity'
import { Product } from '../entities/product.entity'

export abstract class ProductRepository {
  abstract create(
    createProductInput: CreateProductInputWithSlug,
  ): Promise<Product>

  abstract createCategory(name: string): Promise<Category>

  abstract listCategories(): Promise<Category[]>

  abstract findCategoryByName(name: string): Promise<Category>
}
