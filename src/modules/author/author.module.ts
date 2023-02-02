import { Module } from '@nestjs/common'
import { AuthorService } from './author.service'
import { AuthorResolver } from './author.resolver'
import { PrismaService } from '../../shared/database/prisma.service'
import { PostService } from '../post/post.service'
import { AuthorRepository } from './repositories/author.repository'
import { PrismaAuthorRepository } from './repositories/prisma/prisma-author.repository'

@Module({
  providers: [
    AuthorResolver,
    AuthorService,
    PostService,
    PrismaService,
    {
      provide: AuthorRepository,
      useClass: PrismaAuthorRepository,
    },
  ],
})
export class AuthorModule {}
