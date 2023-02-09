import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { JWTGuard } from '../auth/jwt.guard'

import { CreateUserInput } from './dto/inputs/create-user.input'
import { UserWithoutPassword } from './dto/responses/user-without-password.response'
import { UpdateUserInput } from './dto/inputs/update-user.input'

import { USER_CONTEXT } from '../../constants/contexts'

interface UserContext {
  id: string
  email: string
}

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserWithoutPassword, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => UserWithoutPassword, { name: 'profile' })
  @UseGuards(JWTGuard)
  profile(@Context(USER_CONTEXT) user: UserContext) {
    return this.userService.findByEmail(user.email)
  }

  @Mutation(() => UserWithoutPassword, { name: 'updateUser' })
  @UseGuards(JWTGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context(USER_CONTEXT) user: UserContext,
  ) {
    return this.userService.update(user.id, updateUserInput)
  }
}
