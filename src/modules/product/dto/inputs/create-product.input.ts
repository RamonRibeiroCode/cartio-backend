import { InputType, Field } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'

@InputType()
export class CreateProductInput {
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

  @Field(() => GraphQLUpload, { nullable: true })
  mainImage?: Promise<FileUpload>

  @Field(() => [GraphQLUpload], { nullable: true })
  additionalImages?: Promise<FileUpload>[]

  @Field()
  status: string
}

export interface CreateProductInputWithSlug
  extends Omit<CreateProductInput, 'mainImage' | 'additionalImages'> {
  slug: string
  mainImageKey: string
  imagesKeys: string[]
}
