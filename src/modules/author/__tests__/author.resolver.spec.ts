import { Test, TestingModule } from '@nestjs/testing'
import { PostService } from '../../post/post.service'
import { InMemoryPostRepository } from '../../post/repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../../post/repositories/post.repository'
import { AuthorResolver } from '../author.resolver'
import { AuthorService } from '../author.service'
import { AuthorRepository } from '../repositories/author.repository'
import { InMemoryAuthorRepository } from '../repositories/in-memory/in-memory-author.repository'

describe('AuthorResolver', () => {
  let resolver: AuthorResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorResolver,
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

    resolver = module.get<AuthorResolver>(AuthorResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
