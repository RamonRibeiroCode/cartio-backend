import { Test, TestingModule } from '@nestjs/testing'

import { UserResolver } from '../../User/User.resolver'
import { InMemoryUserRepository } from '../../user/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '../../User/repositories/User.repository'
import { UserService } from '../../user/user.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
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
