import { CreatePostInput } from '../dto/create-post.input'
import { Post } from '../entities/post.entity'

export abstract class PostRepository {
  abstract create(createPostInput: CreatePostInput): Promise<Post>

  abstract findById(id: string): Promise<Post>

  abstract findAll(): Promise<Post[]>

  abstract findPostsByAuthorId(id: string): Promise<Post[]>
}
