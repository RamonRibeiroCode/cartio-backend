import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/providers/prisma.service'
import { CreatePostInput } from './dto/create-post.input'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: createPostInput,
    })
  }

  findAll() {
    return this.prisma.post.findMany()
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } })
  }

  findPostsByAuthorId(id: number) {
    return this.prisma.post.findMany({ where: { authorId: id } })
  }
}
