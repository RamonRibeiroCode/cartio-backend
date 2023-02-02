import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../../shared/database/prisma.service'
import { AuthorService } from '../../../author/author.service'
import { PostResolver } from '../post.resolver'
import { PostService } from '../post.service'

describe('PostResolver', () => {
  let resolver: PostResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostResolver, PostService, AuthorService, PrismaService],
    }).compile()

    resolver = module.get<PostResolver>(PostResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
