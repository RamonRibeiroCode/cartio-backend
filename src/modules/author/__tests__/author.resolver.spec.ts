import { Test, TestingModule } from '@nestjs/testing'
import { PostRepository } from '../../post/repositories/post.repository'
import { InMemoryPostRepository } from '../../post/repositories/in-memory/in-memory-post.repository'
import { CreateAuthorInput } from '../dto/create-author.input'

import { AuthorResolver } from '../author.resolver'
import { InMemoryAuthorRepository } from '../repositories/in-memory/in-memory-author.repository'
import { AuthorRepository } from '../repositories/author.repository'
import { AuthorService } from '../author.service'
import { PostService } from '../../post/post.service'
import { Post } from '../../post/entities/post.entity'
import { CreatePostInput } from '../../post/dto/create-post.input'
import { Author } from '../entities/author.entity'

const createAuthorInput: CreateAuthorInput = {
  email: 'test@testing.com',
  name: 'Testing',
}

describe('AuthorResolver', () => {
  let resolver: AuthorResolver
  let postService: PostService

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
    postService = module.get<PostService>(PostService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a author', async () => {
    expect(await resolver.createAuthor(createAuthorInput)).toBeInstanceOf(
      Author,
    )
  })

  it('should return one author', async () => {
    const { id } = await resolver.createAuthor(createAuthorInput)

    expect(await resolver.findById(id)).toBeInstanceOf(Author)
  })

  it('should return all authors', async () => {
    await resolver.createAuthor(createAuthorInput)

    const [author] = await resolver.findAll()

    expect(author).toBeInstanceOf(Author)
  })

  it('should return all posts', async () => {
    const { id } = await resolver.createAuthor(createAuthorInput)

    const createPostInput: CreatePostInput = {
      title: 'Test Post',
      content: 'Test Content',
      published: true,
      authorId: id,
    }

    await postService.create(createPostInput)

    const author = await resolver.findById(id)

    const [post] = await resolver.posts(author)

    expect(post).toBeInstanceOf(Post)
  })
})
