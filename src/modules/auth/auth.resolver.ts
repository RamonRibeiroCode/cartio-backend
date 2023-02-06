import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { SigninResponse } from '../auth/dto/responses/signin.response'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SigninResponse, { name: 'signin' })
  signin(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.signin({ email, password })
  }
}
