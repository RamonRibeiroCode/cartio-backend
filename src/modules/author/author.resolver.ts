import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'

import { AuthorService } from './author.service'
import { Author } from './entities/author.entity'
import { CreateAuthorInput } from './dto/create-author.input'
import { Post } from '../post/entities/post.entity'
import { PostService } from '../post/post.service'

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly postService: PostService,
  ) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorService.create(createAuthorInput)
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorService.findAll()
  }

  @Query(() => Author, { name: 'author' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.authorService.findOne(id)
  }

  @ResolveField(() => [Post], { name: 'posts' })
  async findPostsByAuthor(@Parent() author: Author): Promise<Post[]> {
    const { id } = author

    return this.postService.findPostsByAuthorId(id)
  }
}
