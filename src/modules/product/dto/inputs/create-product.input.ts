import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field()
  categoryId: string

  @Field()
  listPrice: number

  @Field()
  sellingPrice: number

  @Field()
  quantity: number

  @Field({ nullable: true })
  expiresIn?: Date

  @Field()
  validIn: Date

  @Field()
  status: string
}

export interface CreateProductInputWithSlug extends CreateProductInput {
  slug: string
}
