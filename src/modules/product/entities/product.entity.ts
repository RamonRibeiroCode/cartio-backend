import { ObjectType, Field, ID } from '@nestjs/graphql'

type ProductStatus = 'PUBLISHED' | 'UNPUBLISHED' | 'EXPIRED' | string

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
  description?: string

  @Field({ nullable: true })
  expiresIn?: Date

  @Field({ nullable: true })
  validIn?: Date

  @Field()
  status: ProductStatus
}
