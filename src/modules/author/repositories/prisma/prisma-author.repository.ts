import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/database/prisma.service'
import { CreateAuthorInput } from '../../dto/create-author.input'
import { Author } from '../../entities/author.entity'
import { AuthorRepository } from '../author.repository'

@Injectable()
export class PrismaAuthorRepository implements AuthorRepository {
  constructor(private prisma: PrismaService) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.prisma.author.create({
      data: createAuthorInput,
    })
  }

  findAll(): Promise<Author[]> {
    return this.prisma.author.findMany()
  }

  findById(id: number) {
    return this.prisma.author.findUnique({ where: { id } })
  }
}
