import {ProductResponseType} from '@customTypes/products/product.type';

export interface ProductResponseModel {
  success: boolean;
  data: {product: ProductResponseType};
}
