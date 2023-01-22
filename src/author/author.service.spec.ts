import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma.service'
import { AuthorService } from './author.service'

describe('AuthorService', () => {
  let service: AuthorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService, PrismaService],
    }).compile()

    service = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
