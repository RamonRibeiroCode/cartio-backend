import { Injectable } from '@nestjs/common'
import { ValidationError } from 'apollo-server-express'
import { slugify } from '../../helpers/file'
import { StorageProvider } from '../../shared/providers/storage/storage.provider'

import { CreateProductInput } from './dto/inputs/create-product.input'

import { ProductRepository } from './repositories/product.repository'
import { UpdateProductInput } from './dto/inputs/update-product.input'

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

    const { mainImage, additionalImages, ...createProductInfos } =
      createProductInput

    let fileKey: string

    if (mainImage) {
      fileKey = await this.storageProvider.upload(await mainImage)
    }

    const additionalFiles = await Promise.all(additionalImages)

    const additionalFileKeys = await Promise.all(
      additionalFiles.map(async (additionalImage) => {
        const additionalFileKey = await this.storageProvider.upload(
          additionalImage,
        )

        return additionalFileKey
      }),
    )

    const slug = slugify(createProductInput.name)

    return this.productRepository.create({
      ...createProductInfos,
      slug,
      mainImageKey: fileKey,
      imagesKeys: additionalFileKeys,
    })
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const { name } = await this.productRepository.findById(id)

    if (name !== updateProductInput.name) {
      const productAlreadyExists = await this.productRepository.findByName(
        updateProductInput.name,
      )

      if (productAlreadyExists) {
        throw new ValidationError('New Product Name already exists')
      }
    }

    const slug = slugify(updateProductInput.name)

    return this.productRepository.update(id, {
      ...updateProductInput,
      slug,
    })
  }

  async list() {
    return this.productRepository.list()
  }

  async findById(id: string) {
    return this.productRepository.findById(id)
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
