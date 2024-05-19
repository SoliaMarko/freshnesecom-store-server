import {Injectable} from '@nestjs/common';
import {ProductDTO} from '../dto/Product.dto';
import {ProductResponseModel} from '../models/productResponse.model';
import {MongoProductRepository} from '../repository/MongoProduct.repository';
import {PaginatedDTO} from '../dto/pagination.dto';
import {ProductResponseType} from '@customTypes/product.type';
import {ProductsStatsDTO} from '../dto/stats.dto';
import {ProductStatsResponseModel} from '../models/productStatsResponse.model';

@Injectable()
export class ProductService {
  constructor(private readonly repository: MongoProductRepository) {}

  async createProduct(productDTO: ProductDTO): Promise<ProductResponseModel> {
    const newProduct = await this.repository.createProduct(productDTO);

    return {
      success: true,
      data: {product: newProduct}
    };
  }

  async getAllProducts(page: number, itemsPerPage: number, minPrice: number, maxPrice: number): Promise<PaginatedDTO<ProductResponseType>> {
    const {products, itemsCount} = await this.repository.getAllProducts(page, itemsPerPage, minPrice, maxPrice);

    return new PaginatedDTO<ProductResponseType>(products, page, itemsPerPage, itemsCount);
  }

  async getProductsStats(): Promise<ProductStatsResponseModel> {
    const {minPrice, maxPrice, quantityByCategory} = await this.repository.getProductsStats();

    return {
      success: true,
      data: new ProductsStatsDTO(minPrice, maxPrice, quantityByCategory)
    };
  }

  async getProductById(productID: string): Promise<ProductResponseType> {
    return await this.repository.getProductById(productID);
  }

  async updateUser(productID: string, productDTO: ProductDTO): Promise<ProductResponseModel> {
    const updatedProduct = await this.repository.updateProduct(productID, productDTO);

    return {
      success: true,
      data: {product: updatedProduct}
    };
  }
}
