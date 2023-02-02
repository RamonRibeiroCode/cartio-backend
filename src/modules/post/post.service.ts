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

  findOne(id: number) {
    return this.postRepository.findById(id)
  }

  findPostsByAuthorId(id: number) {
    return this.postRepository.findPostsByAuthorId(id)
  }
}
