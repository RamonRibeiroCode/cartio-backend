import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateUserInput } from '../../dto/inputs/create-user.input'
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
}
