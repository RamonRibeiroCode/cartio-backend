import { Injectable } from '@nestjs/common'

import { CreateProductInput } from './dto/inputs/create-product.input'

import { ProductRepository } from './repositories/product.repository'

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductInput: CreateProductInput) {
    return this.productRepository.create(createProductInput)
  }
}
