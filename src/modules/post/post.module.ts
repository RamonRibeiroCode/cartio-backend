import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { PrismaService } from '../../shared/database/prisma.service'
import { AuthorService } from '../author/author.service'
import { AuthorRepository } from '../author/repositories/author.repository'
import { PrismaAuthorRepository } from '../author/repositories/prisma/prisma-author.repository'
import { PostRepository } from './repositories/post.repository'
import { PrismaPostRepository } from './repositories/prisma/prisma-post.repository'

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
    {
      provide: PostRepository,
      useClass: PrismaPostRepository,
    },
  ],
})
export class PostModule {}
