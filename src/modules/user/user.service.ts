import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { CreateUserInput } from './dto/inputs/create-user.input'

import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    const passwordHash = await hash(createUserInput.password, 8)

    return this.userRepository.create({
      ...createUserInput,
      password: passwordHash,
    })
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }
}
