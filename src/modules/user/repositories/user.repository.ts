import { CreateUserInput } from '../dto/inputs/create-user.input'
import { User } from '../entities/user.entity'

export abstract class UserRepository {
  abstract create(createUserInput: CreateUserInput): Promise<User>

  abstract findByEmail(id: string): Promise<User>
}
