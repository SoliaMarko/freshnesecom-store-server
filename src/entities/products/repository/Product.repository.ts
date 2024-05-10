import {ProductResponseType} from '@customTypes/product.type';
import {ProductDTO} from '../dto/Product.dto';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';

export interface ProductRepository {
  createProduct(productDTO: ProductDTO): Promise<ProductResponseType>;
  getAllProducts(page: number, itemsPerPage: number): Promise<GetAllProductsRepositoryType>;
  getSingleProduct(productID: string): Promise<ProductResponseType>;
  updateProduct(productID: string, productDTO: ProductDTO): Promise<ProductResponseType>;
}
