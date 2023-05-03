import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { Category } from './entities/category.entity'
import { JWTGuard } from '../auth/jwt.guard'

import { CreateProductInput } from './dto/inputs/create-product.input'
import { DateProvider } from '../../shared/providers/date/date.provider'
import { StorageProvider } from '../../shared/providers/storage/storage.provider'

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly dateProvider: DateProvider,
    private readonly storageProvider: StorageProvider,
  ) {}

  @Mutation(() => Product, { name: 'createProduct' })
  @UseGuards(JWTGuard)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput)
  }

  @Query(() => [Product])
  @UseGuards(JWTGuard)
  products() {
    return this.productService.list()
  }

  @Mutation(() => Category, { name: 'createCategory' })
  @UseGuards(JWTGuard)
  createCategory(@Args('name') name: string) {
    return this.productService.createCategory(name)
  }

  @Query(() => [Category])
  @UseGuards(JWTGuard)
  categories() {
    return this.productService.listCategories()
  }

  @ResolveField(() => String)
  async status(@Parent() product: Product) {
    const { status, validIn, expiresIn } = product

    const now = this.dateProvider.dateNow()

    const expired =
      expiresIn && this.dateProvider.compareIfBefore(expiresIn, now)
    const notValidYet =
      validIn && this.dateProvider.compareIfBefore(now, validIn)

    if (expired) {
      return 'Expired'
    }

    if (notValidYet) {
      return 'Unpublished'
    }

    return status
  }

  @ResolveField(() => Category)
  async category(@Parent() product: Product) {
    const { categoryId } = product

    return this.productService.findCategoryById(categoryId)
  }

  @ResolveField(() => String, { nullable: true })
  async mainImageUrl(@Parent() product: Product) {
    const { mainImageKey } = product

    if (mainImageKey) {
      return this.storageProvider.getSignedUrl(mainImageKey)
    }

    return null
  }

  @ResolveField(() => [String])
  async additionalImageUrls(@Parent() product: Product) {
    const { imagesKeys } = product

    if (imagesKeys) {
      return imagesKeys.map((imageKey) =>
        this.storageProvider.getSignedUrl(imageKey),
      )
    }

    return []
  }
}
