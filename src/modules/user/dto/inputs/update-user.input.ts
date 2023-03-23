import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  imageKey?: string
}
