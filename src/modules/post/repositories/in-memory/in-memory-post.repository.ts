import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreatePostInput } from '../../dto/create-post.input'
import { Post } from '../../entities/post.entity'
import { PostRepository } from '../Post.repository'

@Injectable()
export class InMemoryPostRepository implements PostRepository {
  posts: Post[] = []

  create(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = {
      id: randomUUID(),
      ...createPostInput,
    }

    this.posts.push(newPost)

    return Promise.resolve(newPost)
  }

  findById(id: string): Promise<Post> {
    return Promise.resolve(this.posts.find((post) => post.id === id))
  }

  findAll(): Promise<Post[]> {
    return Promise.resolve(this.posts)
  }

  findPostsByAuthorId(id: string): Promise<Post[]> {
    console.log(id)

    throw new Error('Method not implemented.')
  }
}
