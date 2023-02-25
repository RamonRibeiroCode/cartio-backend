import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { JWTGuard } from '../auth/jwt.guard'

import { CreateProductInput } from './dto/inputs/create-product.input'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  @UseGuards(JWTGuard)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    this.productService.create(createProductInput)
  }
}
