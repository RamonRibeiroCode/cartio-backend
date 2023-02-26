import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { Category } from './entities/category.entity'
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
    return this.productService.create(createProductInput)
  }

  @Mutation(() => Category, { name: 'createCategory' })
  @UseGuards(JWTGuard)
  createCategory(@Args('name') name: string) {
    return this.productService.createCategory(name)
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JWTGuard)
  categories() {
    return this.productService.listCategories()
  }
}
