import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateUserInput } from '../../dto/inputs/create-user.input'
import { UpdateUserInput } from '../../dto/inputs/update-user.input'
import { User } from '../../entities/user.entity'
import { UserRepository } from '../user.repository'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = {
      id: randomUUID(),
      ...createUserInput,
    }

    this.users.push(newUser)

    return Promise.resolve(newUser)
  }

  findByEmail(email: string) {
    return Promise.resolve(this.users.find((user) => user.email === email))
  }

  findById(id: string) {
    return Promise.resolve(this.users.find((user) => user.id === id))
  }

  update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id)
    const user = this.users[index]

    this.users[index] = { ...user, ...updateUserInput }

    return Promise.resolve(user)
  }

  updateProfilePicture(id: string, fileUrl: string): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id)
    const user = this.users[index]

    this.users[index] = { ...user, imageUrl: fileUrl }

    return Promise.resolve(user)
  }
}
