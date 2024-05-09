import {ProductResponseType} from '@customTypes/product.type';
import {CreateProductDTO} from '../dto/createProduct.dto';
import {GetProductRepositoryType} from '@customTypes/getAllProductsRepository.type';

export interface ProductRepository {
  createProduct(productDTO: CreateProductDTO): Promise<ProductResponseType>;
  getProducts(page: number, itemsPerPage: number): Promise<GetProductRepositoryType>;
}
