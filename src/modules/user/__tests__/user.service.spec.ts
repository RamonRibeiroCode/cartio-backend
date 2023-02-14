import { Test, TestingModule } from '@nestjs/testing'

import { UserService } from '../../user/user.service'
import { InMemoryUserRepository } from '../../user/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '../../User/repositories/user.repository'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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
