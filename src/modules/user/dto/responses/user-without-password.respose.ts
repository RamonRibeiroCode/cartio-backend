import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserWithoutPassword {
  @Field()
  email: string

  @Field()
  name: string
}
