import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { PrismaService } from '../prisma.service'
import { AuthorService } from '../author/author.service'

@Module({
  providers: [PostResolver, PostService, AuthorService, PrismaService],
})
export class PostModule {}
