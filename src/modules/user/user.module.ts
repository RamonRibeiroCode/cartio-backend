import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserRepository } from './repositories/user.repository'
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository'
import { JWTGuard } from '../auth/jwt.guard'

import { StorageModule } from '../../shared/providers/storage/storage.module'
import { PrismaService } from '../../shared/database/prisma.service'

@Module({
  imports: [StorageModule],
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
