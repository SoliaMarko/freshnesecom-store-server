import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {CreateProductDTO} from '../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  async createProduct(@Body() productDTO: CreateProductDTO): Promise<any> {
    return this.productService.createProduct(productDTO);
  }
}
