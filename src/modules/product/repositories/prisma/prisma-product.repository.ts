import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/database/prisma.service'
import { CreateProductInput } from '../../dto/inputs/create-product.input'
import { ProductRepository } from '../product.repository'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    return this.prisma.product.create({
      data: createProductInput,
    })
  }
}
