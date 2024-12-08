import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { Response } from 'express'

interface StripeWebhookEvent {
  id: string
  type: string
  data: any
}

@Controller('order')
export class OrderController {
  @Post('/webhook')
  webhook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() event: StripeWebhookEvent,
  ) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)

        break
      default:
        console.log(`Unhandled event type ${event.type}.`)
    }

    res.status(HttpStatus.OK).send()
  }
}
