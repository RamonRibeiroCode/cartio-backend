import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class SigninResponse {
  @Field()
  email: string

  @Field()
  name: string

  @Field()
  token: string
}
