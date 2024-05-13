import {ProductResponseType} from '@customTypes/product.type';

export interface ProductResponseModel {
  success: boolean;
  data: {product: ProductResponseType};
}
