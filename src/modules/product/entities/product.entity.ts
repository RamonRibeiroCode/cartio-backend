import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

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

  @Field({ nullable: true })
  expiresIn: Date

  @Field()
  validIn: Date

  @Field()
  status: string
}
