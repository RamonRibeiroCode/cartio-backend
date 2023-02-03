import { Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { CreateAuthorInput } from '../../dto/create-author.input'
import { Author } from '../../entities/author.entity'
import { AuthorRepository } from '../author.repository'

@Injectable()
export class InMemoryAuthorRepository implements AuthorRepository {
  authors: Author[] = []

  create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = new Author()

    Object.assign(newAuthor, {
      id: randomUUID(),
      ...createAuthorInput,
    })

    this.authors.push(newAuthor)

    return Promise.resolve(newAuthor)
  }

  findById(id: string): Promise<Author> {
    return Promise.resolve(this.authors.find((post) => post.id === id))
  }

  findAll(): Promise<Author[]> {
    return Promise.resolve(this.authors)
  }
}
