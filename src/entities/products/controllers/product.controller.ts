import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {CreateProductDTO} from '../dto/createProduct.dto';
import {CreateProductResponseModel} from '../models/createProductResponse.model';
import {PaginatedDTO} from '../dto/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';
import {PaginationQueryParams} from '../models/paginationQueryParams.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  async createProduct(@Body() productDTO: CreateProductDTO): Promise<CreateProductResponseModel> {
    return this.productService.createProduct(productDTO);
  }

  @Get()
  async getAllProducts(@Query() paginationQueryParams: PaginationQueryParams): Promise<PaginatedDTO<ProductResponseType>> {
    const {page, itemsPerPage} = paginationQueryParams;

    return this.productService.getAllProducts(page, itemsPerPage);
  }

  @Get(':id')
  async getSingleProduct(@Param('id') productID: string): Promise<ProductResponseType> {
    return this.productService.getSingleProduct(productID);
  }
}
