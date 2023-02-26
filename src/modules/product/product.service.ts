import { Injectable } from '@nestjs/common'
import { ValidationError } from 'apollo-server-express'
import { slugify } from '../../helpers/file'

import { CreateProductInput } from './dto/inputs/create-product.input'

import { ProductRepository } from './repositories/product.repository'

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductInput: CreateProductInput) {
    const slug = slugify(createProductInput.name)

    return this.productRepository.create({ ...createProductInput, slug })
  }

  async createCategory(name: string) {
    const categoryAlreadyExists =
      await this.productRepository.findCategoryByName(name)

    if (categoryAlreadyExists) {
      throw new ValidationError('Category already exists')
    }

    return this.productRepository.createCategory(name)
  }

  async listCategories() {
    return this.productRepository.listCategories()
  }
}
