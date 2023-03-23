import { Test, TestingModule } from '@nestjs/testing'

import { UserService } from '../../user/user.service'
import { InMemoryUserRepository } from '../../user/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '../../User/repositories/user.repository'
import { StorageModule } from 'src/shared/providers/storage/storage.module'
import { JWTGuard } from '../../auth/jwt.guard'
import { UserResolver } from '../user.resolver'

describe('UserService', () => {
  let service: UserService

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

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
