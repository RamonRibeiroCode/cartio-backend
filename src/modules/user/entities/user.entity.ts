import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  password: string

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
