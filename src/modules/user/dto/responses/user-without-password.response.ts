import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserWithoutPassword {
  @Field()
  name: string

  @Field()
  email: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  city?: string
}
