import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, HttpException, HttpStatus} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {ProductDTO} from '../dto/Product.dto';
import {ProductResponseModel} from '../models/productResponse.model';
import {PaginatedDTO} from '../dto/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';
import {PaginationQueryParams} from '../models/paginationQueryParams.model';
import {Types} from 'mongoose';
import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  async createProduct(@Body() productDTO: ProductDTO): Promise<ProductResponseModel> {
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

  @Put(':id')
  async updateUser(@Param('id') productID: string, @Body() productDTO: ProductDTO): Promise<ProductResponseModel> {
    const isValid = Types.ObjectId.isValid(productID);
    if (!isValid) {
      throw new HttpException(productErrorMessages.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
    return this.productService.updateUser(productID, productDTO);
  }
}
