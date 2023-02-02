import { CreateAuthorInput } from '../dto/create-author.input'
import { Author } from '../entities/author.entity'

export abstract class AuthorRepository {
  abstract create(createAuthorInput: CreateAuthorInput): Promise<Author>

  abstract findAll(): Promise<Author[]>

  abstract findById(id: number): Promise<Author>
}
