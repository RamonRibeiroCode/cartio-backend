import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/database/prisma.service'
import { CreatePostInput } from '../../dto/create-post.input'
import { Post } from '../../entities/post.entity'
import { PostRepository } from '../post.repository'

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: createPostInput,
    })
  }

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany()
  }

  findById(id: string) {
    return this.prisma.post.findUnique({ where: { id } })
  }

  findPostsByAuthorId(id: string) {
    return this.prisma.post.findMany({ where: { authorId: id } })
  }
}
