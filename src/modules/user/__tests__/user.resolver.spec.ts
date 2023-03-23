import { Test, TestingModule } from '@nestjs/testing'

import { UserResolver } from '../../User/User.resolver'
import { InMemoryUserRepository } from '../../user/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '../../User/repositories/User.repository'
import { UserService } from '../../user/user.service'
import { JWTGuard } from '../../auth/jwt.guard'
import { StorageModule } from 'src/shared/providers/storage/storage.module'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StorageModule],
      providers: [
        UserResolver,
        UserService,
        JWTGuard,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
