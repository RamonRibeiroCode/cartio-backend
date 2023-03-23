import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { UserModule } from 'src/modules/user/user.module'
import { join } from 'path'
import { AppResolver } from './app.resolver'
import { AuthModule } from 'src/modules/auth/auth.module'
import { ProductModule } from 'src/modules/product/product.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: true,
    }),
    AuthModule,
    ProductModule,
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
