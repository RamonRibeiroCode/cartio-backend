import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateProductInput {
  @Field()
  name: string

  @Field({ nullable: true })
  categoryId: string

  @Field({ nullable: true })
  listPrice: number

  @Field({ nullable: true })
  sellingPrice: number

  @Field({ nullable: true })
  quantity: number

  @Field({ nullable: true })
  expiresIn?: Date

  @Field({ nullable: true })
  validIn?: Date

  @Field({ nullable: true })
  description?: string

  @Field()
  status: string
}

export interface UpdateProductInputWithSlug {
  slug: string
}
