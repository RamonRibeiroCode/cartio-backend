import { Test, TestingModule } from '@nestjs/testing'
import { PostService } from '../../post/post.service'
import { InMemoryPostRepository } from '../../post/repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../../post/repositories/post.repository'
import { AuthorService } from '../author.service'
import { AuthorRepository } from '../repositories/author.repository'
import { InMemoryAuthorRepository } from '../repositories/in-memory/in-memory-author.repository'

describe('AuthorService', () => {
  let service: AuthorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
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

    service = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
