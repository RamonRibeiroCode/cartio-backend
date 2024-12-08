import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'

import { PrismaService } from '../../shared/database/prisma.service'
import { OrderController } from './order.controller'

@Module({
  controllers: [OrderController],
  providers: [OrderResolver, OrderService, PrismaService],
})
export class OrderModule {}
