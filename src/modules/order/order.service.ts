import { Injectable } from '@nestjs/common'
import StripeClass from 'stripe'
import { v4 as uuid } from 'uuid'

const { STRIPE_SECRET_KEY } = process.env

@Injectable()
export class OrderService {
  async createPaymentIntent() {
    const stripe = new StripeClass(STRIPE_SECRET_KEY)

    const items = [
      {
        imageKey: '1eb72b54-ddbd-4761-be80-fed20b1cda9c-iphonebranco3-webp',
        name: 'iPhone 13 Pro',
        price: 2500.0,
        quantity: 2,
        discount: 150.0,
      },
    ]

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2205,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
      customer: 'ramonribeiro120@gmail.com',
      shipping: {
        name: 'Home Delivery',
        address: {
          line1: 'No. 15 Adekunle Street',
          city: 'Yaba',
          state: 'Lagos State',
        },
      },
      metadata: {
        orderId: uuid(),
        items: JSON.stringify(items),
      },
    })

    return paymentIntent.client_secret
  }
}
