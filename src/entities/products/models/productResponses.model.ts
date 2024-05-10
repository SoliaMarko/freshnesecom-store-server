import {ProductResponseType} from '@customTypes/product.type';

export interface CreateProductResponseModel {
  success: boolean;
  data: {product: ProductResponseType};
}
