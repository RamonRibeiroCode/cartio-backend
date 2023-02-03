import { Injectable } from '@nestjs/common'
import { CreatePostInput } from './dto/create-post.input'
import { PostRepository } from './repositories/post.repository'

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  create(createPostInput: CreatePostInput) {
    return this.postRepository.create(createPostInput)
  }

  findAll() {
    return this.postRepository.findAll()
  }

  findOne(id: string) {
    return this.postRepository.findById(id)
  }

  findPostsByAuthorId(id: string) {
    return this.postRepository.findPostsByAuthorId(id)
  }
}
