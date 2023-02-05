import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { PrismaService } from '../../shared/database/prisma.service'
import { UserRepository } from './repositories/user.repository'
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository'
import { JWTGuard } from '../auth/jwt.guard'

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    JWTGuard,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
