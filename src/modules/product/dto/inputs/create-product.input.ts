import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field()
  slug: string

  @Field()
  categoryId: string

  @Field()
  listPrice: number

  @Field()
  sellingPrice: number

  @Field()
  quantity: number

  @Field()
  expiresIn: Date

  @Field()
  validIn: Date

  @Field()
  status: string
}
