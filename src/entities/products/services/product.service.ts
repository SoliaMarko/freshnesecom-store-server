import {Injectable} from '@nestjs/common';
import {ProductDTO} from '../dto/Product.dto';
import {ProductResponseModel} from '../models/responses/productResponse.model';
import {MongoProductRepository} from '../repository/MongoProduct.repository';
import {PaginatedDTO} from '../dto/products/pagination.dto';
import {ProductResponseType} from '@customTypes/products/product.type';
import {ProductsStatsDTO} from '../dto/stats/stats.dto';
import {ProductStatsResponseModel} from '../models/responses/productStatsResponse.model';
import {FiltersDTO} from '../dto/products/filters.dto';
import {FiltersForStatsGettingDTO} from '../dto/stats/filtersForStatsGetting.dto';
import {AllWishlistProductsParams} from '@customTypes/products/wishlistProductsParams.type';

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

  async getAllProducts(filtersDTO: FiltersDTO): Promise<PaginatedDTO<ProductResponseType>> {
    const {products, itemsCount} = await this.repository.getAllProducts(filtersDTO);
    const {page, itemsPerPage} = filtersDTO;

    return new PaginatedDTO<ProductResponseType>(products, page, itemsPerPage, itemsCount);
  }

  async getAllWishlistProducts(allWishlistProductsParams: AllWishlistProductsParams): Promise<PaginatedDTO<ProductResponseType>> {
    const {products, itemsCount} = await this.repository.getAllWishlistProducts(allWishlistProductsParams);
    const {page, itemsPerPage} = allWishlistProductsParams;

    return new PaginatedDTO<ProductResponseType>(products, page, itemsPerPage, itemsCount);
  }

  async getProductsStats(filtersDTO: FiltersForStatsGettingDTO): Promise<ProductStatsResponseModel> {
    const {minPrice, maxPrice, quantityByCategory} = await this.repository.getProductsStats(filtersDTO);

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
