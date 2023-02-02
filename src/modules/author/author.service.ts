import { Injectable } from '@nestjs/common'
import { Author } from '@prisma/client'

import { CreateAuthorInput } from './dto/create-author.input'
import { AuthorRepository } from './repositories/author.repository'

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.authorRepository.create(createAuthorInput)
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.findAll()
  }

  findOne(id: number) {
    return this.authorRepository.findById(id)
  }
}
