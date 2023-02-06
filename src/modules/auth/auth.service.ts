import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'

import { SigninInput } from '../auth/dto/inputs/signin.input'
import { SigninResponse } from '../auth/dto/responses/signin.response'
import { UserRepository } from '../user/repositories/user.repository'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signin(signinInput: SigninInput) {
    const { SECRET_TOKEN, EXPIRES_IN_TOKEN } = process.env

    const user = await this.userRepository.findByEmail(signinInput.email)

    if (!user) {
      throw new UserInputError('Wrong e-mail or password')
    }

    const passwordMatch = await compare(signinInput.password, user.password)

    if (!passwordMatch) {
      throw new UserInputError('Wrong e-mail or password')
    }

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = sign(payload, SECRET_TOKEN, {
      expiresIn: EXPIRES_IN_TOKEN,
    })

    const tokenReturn: SigninResponse = {
      token,
      name: user.name,
      email: user.email,
    }

    return tokenReturn
  }
}
