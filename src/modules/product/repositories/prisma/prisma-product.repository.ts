import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/database/prisma.service'
import { CreateProductInputWithSlug } from '../../dto/inputs/create-product.input'
import { ProductRepository } from '../product.repository'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductInputWithSlug) {
    return this.prisma.product.create({
      data: createProductInput,
    })
  }

  async list() {
    return this.prisma.product.findMany()
  }

  async findByName(name: string) {
    return this.prisma.product.findFirst({ where: { name } })
  }

  async createCategory(name: string) {
    return this.prisma.category.create({
      data: {
        name,
      },
    })
  }

  async listCategories() {
    return this.prisma.category.findMany()
  }

  async findCategoryByName(name: string) {
    return this.prisma.category.findFirst({ where: { name } })
  }

  async findCategoryById(id: string) {
    return this.prisma.category.findUnique({ where: { id } })
  }
}
