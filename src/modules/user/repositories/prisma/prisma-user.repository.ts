import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/database/prisma.service'
import { CreateUserInput } from '../../dto/inputs/create-user.input'
import { UpdateUserInput } from '../../dto/inputs/update-user.input'
import { User } from '../../entities/user.entity'
import { UserRepository } from '../user.repository'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data: createUserInput })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ data: updateUserInput, where: { id } })
  }

  updateProfilePicture(id: string, fileUrl: string): Promise<User> {
    return this.prisma.user.update({
      data: {
        imageUrl: fileUrl,
      },
      where: { id },
    })
  }
}
