import { Test, TestingModule } from '@nestjs/testing'

import { AuthorService } from '../../author/author.service'
import { AuthorRepository } from '../../author/repositories/author.repository'
import { InMemoryAuthorRepository } from '../../author/repositories/in-memory/in-memory-author.repository'
import { PostResolver } from '../post.resolver'
import { PostService } from '../post.service'
import { InMemoryPostRepository } from '../repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../repositories/post.repository'

describe('PostResolver', () => {
  let resolver: PostResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        PostService,
        AuthorService,
        {
          provide: AuthorRepository,
          useClass: InMemoryAuthorRepository,
        },
        {
          provide: PostRepository,
          useClass: InMemoryPostRepository,
        },
      ],
    }).compile()

    resolver = module.get<PostResolver>(PostResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
