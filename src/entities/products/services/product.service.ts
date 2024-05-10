import {Injectable} from '@nestjs/common';
import {CreateProductDTO} from '../dto/createProduct.dto';
import {CreateProductResponseModel} from '../models/createProductResponse.model';
import {MongoProductRepository} from '../repository/MongoProduct.repository';
import {PaginatedDTO} from '../dto/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';

@Injectable()
export class ProductService {
  constructor(private readonly repository: MongoProductRepository) {}

  async createProduct(productDTO: CreateProductDTO): Promise<CreateProductResponseModel> {
    const newProduct = await this.repository.createProduct(productDTO);

    return {
      success: true,
      data: {product: newProduct}
    };
  }

  async getAllProducts(page: number, itemsPerPage: number): Promise<PaginatedDTO<ProductResponseType>> {
    const {products, itemsCount} = await this.repository.getAllProducts(page, itemsPerPage);

    return new PaginatedDTO<ProductResponseType>(products, page, itemsPerPage, itemsCount);
  }

  async getProductById(productID: string): Promise<ProductResponseType> {
    return await this.repository.getProductById(productID);
  }
}
