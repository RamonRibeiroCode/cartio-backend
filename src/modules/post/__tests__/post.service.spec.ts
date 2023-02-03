import { Test, TestingModule } from '@nestjs/testing'
import { AuthorRepository } from '../../author/repositories/author.repository'
import { InMemoryAuthorRepository } from '../../author/repositories/in-memory/in-memory-author.repository'

import { PostService } from '../post.service'
import { InMemoryPostRepository } from '../repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../repositories/post.repository'

describe('PostService', () => {
  let service: PostService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
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

    service = module.get<PostService>(PostService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
