import { Module } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { PrismaUserRepository } from '../user/repositories/prisma/prisma-user.repository'
import { UserRepository } from '../user/repositories/user.repository'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
