import {globalProductConstants} from '@constants/global.constant';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';

export class PaginationQueryParams {
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

  // @Type(() => Number)
  // @Min(0)
  // @Max(5)
  // readonly minRating: number;

  // @Type(() => Number)
  // @Min(0)
  // @Max(5)
  // readonly maxRating: number;

  // readonly brand: string;

  // readonly category: string;

  // readonly sortBy: string;
  // available options: ['title', 'rating', 'price', 'quantity']
  // asc => default OR desc
}
