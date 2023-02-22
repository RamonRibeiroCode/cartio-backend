import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductRepository } from './repositories/product.repository'
import { PrismaProductRepository } from './repositories/prisma/prisma-product.repository'
import { JWTGuard } from '../auth/jwt.guard'

import { StorageModule } from '../../shared/providers/storage/storage.module'
import { PrismaService } from '../../shared/database/prisma.service'

@Module({
  imports: [StorageModule],
  providers: [
    ProductResolver,
    ProductService,
    PrismaService,
    JWTGuard,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductModule {}
