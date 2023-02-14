import { CreateUserInput } from '../dto/inputs/create-user.input'
import { UpdateUserInput } from '../dto/inputs/update-user.input'
import { User } from '../entities/user.entity'

export abstract class UserRepository {
  abstract create(createUserInput: CreateUserInput): Promise<User>

  abstract findByEmail(email: string): Promise<User>

  abstract findById(id: string): Promise<User>

  abstract update(id: string, updateUserInput: UpdateUserInput): Promise<User>

  abstract updateProfilePicture(id: string, fileUrl: string): Promise<User>
}
