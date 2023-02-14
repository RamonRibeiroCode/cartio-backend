import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload'

import { AppModule } from './shared/infra/http/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(graphqlUploadExpress({ maxFileSize: 3 * 1024 * 1024, maxFiles: 1 })) // 3 MB

  await app.listen(5000)
}

bootstrap()
