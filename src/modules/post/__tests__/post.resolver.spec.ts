import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'

import { AuthorService } from '../../author/author.service'
import { CreateAuthorInput } from '../../author/dto/create-author.input'
import { Author } from '../../author/entities/author.entity'
import { AuthorRepository } from '../../author/repositories/author.repository'
import { InMemoryAuthorRepository } from '../../author/repositories/in-memory/in-memory-author.repository'
import { CreatePostInput } from '../dto/create-post.input'
import { Post } from '../entities/post.entity'
import { PostResolver } from '../post.resolver'
import { PostService } from '../post.service'
import { InMemoryPostRepository } from '../repositories/in-memory/in-memory-post.repository'
import { PostRepository } from '../repositories/post.repository'

const createPostInput: CreatePostInput = {
  title: 'Test Post',
  content: 'Test Content',
  published: true,
  authorId: randomUUID(),
}

const createAuthorInput: CreateAuthorInput = {
  email: 'test@testing.com',
  name: 'Testing',
}

describe('PostResolver', () => {
  let resolver: PostResolver
  let authorService: AuthorService

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
    authorService = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a post', async () => {
    expect(await resolver.createPost(createPostInput)).toBeInstanceOf(Post)
  })

  it('should return one post', async () => {
    const { id } = await resolver.createPost(createPostInput)

    expect(await resolver.findOne(id)).toBeInstanceOf(Post)
  })

  it('should return all posts', async () => {
    await resolver.createPost(createPostInput)

    const [post] = await resolver.findAll()

    expect(post).toBeInstanceOf(Post)
  })

  it('should return the author by post', async () => {
    const { id } = await authorService.create(createAuthorInput)

    const createPostInputWithAuthor: CreatePostInput = {
      title: 'Test Post',
      content: 'Test Content',
      published: true,
      authorId: id,
    }

    const post = await resolver.createPost(createPostInputWithAuthor)

    const author = await resolver.author(post)

    expect(author).toBeInstanceOf(Author)
  })
})
