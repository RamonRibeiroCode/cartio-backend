import { Injectable } from '@nestjs/common'
import { ValidationError } from 'apollo-server-express'
import { slugify } from '../../helpers/file'
import { StorageProvider } from '../../shared/providers/storage/storage.provider'

import { CreateProductInput } from './dto/inputs/create-product.input'

import { ProductRepository } from './repositories/product.repository'

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private storageProvider: StorageProvider,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const productAlreadyExists = await this.productRepository.findByName(
      createProductInput.name,
    )

    if (productAlreadyExists) {
      throw new ValidationError('Product already exists')
    }

    const { mainImage, ...createProductInfos } = createProductInput

    let fileKey: string

    if (mainImage) {
      fileKey = await this.storageProvider.upload(await mainImage)
    }

    const slug = slugify(createProductInput.name)

    return this.productRepository.create({
      ...createProductInfos,
      slug,
      mainImageKey: fileKey,
    })
  }

  async list() {
    return this.productRepository.list()
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

  async findCategoryById(id: string) {
    return this.productRepository.findCategoryById(id)
  }
}
