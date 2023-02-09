import { Module } from '@nestjs/common'
import { S3StorageProvider } from './implementations/s3-storage.provider'
import { StorageProvider } from './storage.provider'

@Module({
  exports: [{ provide: StorageProvider, useClass: S3StorageProvider }],
  providers: [{ provide: StorageProvider, useClass: S3StorageProvider }],
})
export class StorageModule {}
