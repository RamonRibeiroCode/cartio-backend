import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { AuthorRepository } from '../../author/repositories/author.repository'
import { InMemoryAuthorRepository } from '../../author/repositories/in-memory/in-memory-author.repository'
import { CreatePostInput } from '../dto/create-post.input'
import { Post } from '../entities/post.entity'

import { PostService } from '../post.service'
import { InMemoryPostRepository } from '../repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../repositories/post.repository'

const createPostInput: CreatePostInput = {
  title: 'Test Post',
  content: 'Test Content',
  published: true,
  authorId: randomUUID(),
}

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

  it('should create a post', async () => {
    expect(await service.create(createPostInput)).toBeInstanceOf(Post)
  })

  it('should return one post', async () => {
    const { id } = await service.create(createPostInput)

    expect(await service.findOne(id)).toBeInstanceOf(Post)
  })

  it('should return all posts', async () => {
    await service.create(createPostInput)

    const [post] = await service.findAll()

    expect(post).toBeInstanceOf(Post)
  })

  it('should return all posts by authorId', async () => {
    const { authorId } = await service.create(createPostInput)

    const [post] = await service.findPostsByAuthorId(authorId)

    expect(post).toBeInstanceOf(Post)
  })
})
