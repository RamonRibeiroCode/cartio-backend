import { NestFactory } from '@nestjs/core'

import { graphqlUploadExpress } from 'graphql-upload-ts'

import { AppModule } from './shared/infra/http/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(graphqlUploadExpress({ maxFileSize: 3 * 1024 * 1024, maxFiles: 5 })) // 3 MB

  await app.listen(process.env.PORT)
}

bootstrap()
