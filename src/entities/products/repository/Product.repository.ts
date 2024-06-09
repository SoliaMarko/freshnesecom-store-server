import {ProductResponseType} from '@customTypes/products/product.type';
import {ProductDTO} from '../dto/Product.dto';
import {GetProductsResponseType} from '@customTypes/products/getProductsResponse.type';
import {ProductsStatsDTO} from '../dto/stats/stats.dto';
import {FiltersDTO} from '../dto/products/filters.dto';
import {FiltersForStatsGettingDTO} from '../dto/stats/filtersForStatsGetting.dto';
import {AllWishlistProductsParams} from '@customTypes/products/wishlistProductsParams.type';

export interface ProductRepository {
  createProduct(productDTO: ProductDTO): Promise<ProductResponseType>;
  getAllProducts(filtersDTO: FiltersDTO): Promise<GetProductsResponseType>;
  getAllWishlistProducts(allWishlistProductsParams: AllWishlistProductsParams): Promise<GetProductsResponseType>;
  getProductsStats(filtersDTO: FiltersForStatsGettingDTO): Promise<ProductsStatsDTO>;
  getProductById(productID: string): Promise<ProductResponseType>;
  updateProduct(productID: string, productDTO: ProductDTO): Promise<ProductResponseType>;
}
