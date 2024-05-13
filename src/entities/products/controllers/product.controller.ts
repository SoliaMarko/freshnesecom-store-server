import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {ProductDTO} from '../dto/Product.dto';
import {ProductResponseModel} from '../models/productResponse.model';
import {PaginatedDTO} from '../dto/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';
import {PaginationQueryParams} from '../models/paginationQueryParams.model';
import {IdValidationPipe} from '@pipes/idValidation.pipe';

@Controller('product')
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
  async getProductById(@Param('id', new IdValidationPipe()) productID: string): Promise<ProductResponseType> {
    return this.productService.getProductById(productID);
  }

  @Put(':id')
  async updateUser(@Param('id', new IdValidationPipe()) productID: string, @Body() productDTO: ProductDTO): Promise<ProductResponseModel> {
    return this.productService.updateUser(productID, productDTO);
  }
}
