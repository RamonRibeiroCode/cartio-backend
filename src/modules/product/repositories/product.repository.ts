import { CreateProductInputWithSlug } from '../dto/inputs/create-product.input'
import { UpdateProductInputWithSlug } from '../dto/inputs/update-product.input'
import { Category } from '../entities/category.entity'
import { Product } from '../entities/product.entity'

export abstract class ProductRepository {
  abstract create(
    createProductInput: CreateProductInputWithSlug,
  ): Promise<Product>

  abstract update(
    id: string,
    updateProductInput: UpdateProductInputWithSlug,
  ): Promise<Product>

  abstract list(): Promise<Product[]>

  abstract findById(id: string): Promise<Product>

  abstract findByName(name: string): Promise<Product>

  abstract createCategory(name: string): Promise<Category>

  abstract listCategories(): Promise<Category[]>

  abstract findCategoryByName(name: string): Promise<Category>

  abstract findCategoryById(id: string): Promise<Category>
}
