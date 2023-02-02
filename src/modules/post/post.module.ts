import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { PrismaService } from '../../shared/database/prisma.service'
import { AuthorService } from '../author/author.service'
import { AuthorRepository } from '../author/repositories/author.repository'
import { PrismaAuthorRepository } from '../author/repositories/prisma/prisma-author.repository'

@Module({
  providers: [
    PostResolver,
    PostService,
    AuthorService,
    PrismaService,
    {
      provide: AuthorRepository,
      useClass: PrismaAuthorRepository,
    },
  ],
})
export class PostModule {}
