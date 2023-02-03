import { Test, TestingModule } from '@nestjs/testing'
import { PostRepository } from '../../post/repositories/post.repository'
import { InMemoryPostRepository } from '../../post/repositories/in-memory/in-memory-post.repository'
import { CreateAuthorInput } from '../dto/create-author.input'
import { Author } from '../entities/author.entity'

import { AuthorService } from '../author.service'
import { InMemoryAuthorRepository } from '../repositories/in-memory/in-memory-author.repository'
import { AuthorRepository } from '../repositories/author.repository'

const createAuthorInput: CreateAuthorInput = {
  email: 'test@testing.com',
  name: 'Testing',
}

describe('AuthorService', () => {
  let service: AuthorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a author', async () => {
    expect(await service.create(createAuthorInput)).toBeInstanceOf(Author)
  })

  it('should return one author', async () => {
    const { id } = await service.create(createAuthorInput)

    expect(await service.findOne(id)).toBeInstanceOf(Author)
  })

  it('should return all authors', async () => {
    await service.create(createAuthorInput)

    const [author] = await service.findAll()

    expect(author).toBeInstanceOf(Author)
  })
})
