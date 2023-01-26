import { Module } from '@nestjs/common'
import { AuthorService } from './author.service'
import { AuthorResolver } from './author.resolver'
import { PrismaService } from '../../shared/providers/prisma.service'
import { PostService } from '../post/post.service'

@Module({
  providers: [AuthorResolver, AuthorService, PostService, PrismaService],
})
export class AuthorModule {}
