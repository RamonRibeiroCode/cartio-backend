import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { FileUpload } from 'graphql-upload'
import { StorageProvider } from '../../shared/providers/storage/storage.provider'

import { CreateUserInput } from './dto/inputs/create-user.input'
import { UpdateUserInput } from './dto/inputs/update-user.input'

import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private storageProvider: StorageProvider,
  ) {}

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

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput)
  }

  async updateProfilePicture(id: string, file: FileUpload) {
    const fileUrl = await this.storageProvider.upload(file)

    const { imageUrl } = await this.userRepository.findById(id)

    if (imageUrl) {
      const key = imageUrl.split('amazonaws.com/')[1]

      this.storageProvider.delete(key)
    }

    return this.userRepository.updateProfilePicture(id, fileUrl)
  }

  async deleteProfilePicture(id: string) {
    const { imageUrl } = await this.userRepository.findById(id)

    if (imageUrl) {
      const key = imageUrl.split('amazonaws.com/')[1]

      this.storageProvider.delete(key)
    }

    return this.userRepository.update(id, { imageUrl: null })
  }
}
