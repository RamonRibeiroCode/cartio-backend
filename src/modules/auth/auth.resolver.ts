import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { SigninInput } from '../auth/dto/inputs/signin.input'
import { SigninResponse } from '../auth/dto/responses/signin.response'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SigninResponse, { name: 'signin' })
  signin(@Args('signinInput') signinInput: SigninInput) {
    return this.authService.signin(signinInput)
  }
}
