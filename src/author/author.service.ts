import { Injectable } from '@nestjs/common'
import { Author } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreateAuthorInput } from './dto/create-author.input'

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.prisma.author.create({
      data: createAuthorInput,
    })
  }

  findAll(): Promise<Author[]> {
    return this.prisma.author.findMany()
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id } })
  }
}
