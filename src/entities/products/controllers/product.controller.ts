import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {ProductDTO} from '../dto/Product.dto';
import {ProductResponseModel} from '../models/productResponse.model';
import {PaginatedDTO} from '../dto/products/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';
import {ProductsQueryParams} from '../models/paginationQueryParams.model';
import {IdValidationPipe} from '@pipes/idValidation.pipe';
import {ProductStatsResponseModel} from '../models/productStatsResponse.model';
import {FiltersDTO} from '../dto/products/filters.dto';
import {ProductsStatsQueryParams} from '../models/statsQueryParams.model';
import {FiltersForStatsGettingDTO} from '../dto/stats/filtersForStatsGetting.dto';
import {ApiProducts} from 'decorators/swagger/products/apiProducts.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  @ApiProducts()
  async createProduct(@Body() productDTO: ProductDTO): Promise<ProductResponseModel> {
    return this.productService.createProduct(productDTO);
  }

  @Get()
  @ApiProducts()
  async getAllProducts(@Query() productsQueryParams: ProductsQueryParams): Promise<PaginatedDTO<ProductResponseType>> {
    const filtersDTO = new FiltersDTO(productsQueryParams);

    return this.productService.getAllProducts(filtersDTO);
  }

  @Get('stats')
  @ApiProducts()
  async getProductsStats(@Query() productsStatsQueryParams: ProductsStatsQueryParams): Promise<ProductStatsResponseModel> {
    const filtersForStatsGettingDTO = new FiltersForStatsGettingDTO(productsStatsQueryParams);

    return this.productService.getProductsStats(filtersForStatsGettingDTO);
  }

  @Get(':id')
  @ApiProducts()
  async getProductById(@Param('id', new IdValidationPipe()) productID: string): Promise<ProductResponseType> {
    return this.productService.getProductById(productID);
  }

  @Put(':id')
  @ApiProducts()
  async updateUser(@Param('id', new IdValidationPipe()) productID: string, @Body() productDTO: ProductDTO): Promise<ProductResponseModel> {
    return this.productService.updateUser(productID, productDTO);
  }
}
