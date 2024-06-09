import {ProductResponseType} from '@customTypes/product.type';
import {ProductDTO} from '../dto/Product.dto';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';
import {ProductsStatsDTO} from '../dto/stats/stats.dto';
import {FiltersDTO} from '../dto/products/filters.dto';
import {FiltersForStatsGettingDTO} from '../dto/stats/filtersForStatsGetting.dto';

export interface ProductRepository {
  createProduct(productDTO: ProductDTO): Promise<ProductResponseType>;
  getAllProducts(filtersDTO: FiltersDTO): Promise<GetAllProductsRepositoryType>;
  getProductsStats(filtersDTO: FiltersForStatsGettingDTO): Promise<ProductsStatsDTO>;
  getProductById(productID: string): Promise<ProductResponseType>;
  updateProduct(productID: string, productDTO: ProductDTO): Promise<ProductResponseType>;
}
