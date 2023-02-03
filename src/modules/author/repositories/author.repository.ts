import { CreateAuthorInput } from '../dto/create-author.input'
import { Author } from '../entities/author.entity'

export abstract class AuthorRepository {
  abstract create(createAuthorInput: CreateAuthorInput): Promise<Author>

  abstract findById(id: string): Promise<Author>

  abstract findAll(): Promise<Author[]>
}
