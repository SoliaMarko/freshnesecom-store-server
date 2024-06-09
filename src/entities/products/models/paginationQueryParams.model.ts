import {globalProductConstants} from '@constants/global.constant';
import {Category} from '@enums/products/categories.enum';
import {SortBy} from '@enums/sort/sortBy.enum';
import {Order} from '@enums/sort/order.enum';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';

export class ProductsQueryParams {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly page: number = globalProductConstants.default.DEFAULT_PAGE;

  @Type(() => Number)
  @IsInt()
  @Min(globalProductConstants.constraints.MIN_ITEMS_PER_PAGE)
  readonly itemsPerPage: number = globalProductConstants.default.DEFAULT_ITEMS_PER_PAGE;

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
