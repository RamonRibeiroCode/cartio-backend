import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload'

import { AppModule } from './shared/infra/http/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

  await app.listen(5000)
}

bootstrap()
