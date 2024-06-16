import {UserResponseType} from '@customTypes/user/user.type';
import {PaginationQueryParams} from '@entities/products/models/queryParams/paginationQueryParams.model';

export interface AllWishlistProductsParams extends PaginationQueryParams {
  user: UserResponseType;
}
