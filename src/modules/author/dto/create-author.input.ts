import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateAuthorInput {
  @Field()
  email: string

  @Field()
  name: string
}
