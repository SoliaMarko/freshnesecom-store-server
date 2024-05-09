import {ProductResponseType} from '@customTypes/product.type';
import {CreateProductDTO} from '../dto/createProduct.dto';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';

export interface ProductRepository {
  createProduct(productDTO: CreateProductDTO): Promise<ProductResponseType>;
  getAllProducts(page: number, itemsPerPage: number): Promise<GetAllProductsRepositoryType>;
}
