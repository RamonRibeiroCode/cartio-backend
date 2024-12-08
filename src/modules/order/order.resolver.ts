import { Resolver, Mutation } from '@nestjs/graphql'

import { OrderService } from './order.service'

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => String)
  async createPaymentIntent() {
    const client_secret = await this.orderService.createPaymentIntent()

    return client_secret
  }
}
