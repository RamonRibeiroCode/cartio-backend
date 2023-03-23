import {
  Resolver,
  Mutation,
  Args,
  Context,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { GraphQLUpload, FileUpload } from 'graphql-upload-ts'

import { UserService } from './user.service'
import { JWTGuard } from '../auth/jwt.guard'

import { CreateUserInput } from './dto/inputs/create-user.input'
import { UserWithoutPassword } from './dto/responses/user-without-password.response'
import { UpdateUserInput } from './dto/inputs/update-user.input'

import { USER_CONTEXT } from '../../constants/contexts'
import { StorageProvider } from '../../shared/providers/storage/storage.provider'

interface UserContext {
  id: string
  email: string
}

@Resolver(() => UserWithoutPassword)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly storageProvider: StorageProvider,
  ) {}

  @Mutation(() => UserWithoutPassword, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => UserWithoutPassword, { name: 'profile' })
  @UseGuards(JWTGuard)
  async profile(@Context(USER_CONTEXT) user: UserContext) {
    const profile = await this.userService.findByEmail(user.email)

    return profile
  }

  @Mutation(() => UserWithoutPassword, { name: 'updateUser' })
  @UseGuards(JWTGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context(USER_CONTEXT) user: UserContext,
  ) {
    return this.userService.update(user.id, updateUserInput)
  }

  @Mutation(() => UserWithoutPassword, { name: 'updateProfilePicture' })
  @UseGuards(JWTGuard)
  async updateProfilePicture(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Context(USER_CONTEXT) user: UserContext,
  ) {
    return this.userService.updateProfilePicture(user.id, file)
  }

  @Mutation(() => UserWithoutPassword, { name: 'deleteProfilePicture' })
  @UseGuards(JWTGuard)
  async deleteProfilePicture(@Context(USER_CONTEXT) user: UserContext) {
    return this.userService.deleteProfilePicture(user.id)
  }

  @ResolveField(() => String)
  async imageUrl(@Parent() userWithoutPassword: UserWithoutPassword) {
    const { imageKey } = userWithoutPassword

    if (!imageKey) {
      return null
    }

    return await this.storageProvider.getSignedUrl(imageKey)
  }
}
