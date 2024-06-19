import {Category} from '@enums/products/categories.enum';
import {SortBy} from '@enums/sort/sortBy.enum';
import {Order} from '@enums/sort/order.enum';
import {Type} from 'class-transformer';
import {PaginationQueryParams} from './paginationQueryParams.model';

export class ProductsQueryParams extends PaginationQueryParams {
  @Type(() => String)
  readonly search: string;

  @Type(() => Number)
  readonly minPrice: number;

  @Type(() => Number)
  readonly maxPrice: number;

  @Type(() => Number)
  readonly minRating: number;

  @Type(() => Number)
  readonly maxRating: number;

  @Type(() => Number)
  readonly category: Category;

  @Type(() => String)
  readonly brands: string;

  @Type(() => Number)
  readonly sortBy: SortBy;

  @Type(() => Number)
  readonly order: Order;
}
