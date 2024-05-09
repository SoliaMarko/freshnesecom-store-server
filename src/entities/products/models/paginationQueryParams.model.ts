import {globalProductConstants} from '@constants/global.constant';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';

export class PaginationQueryParams {
  @Type(() => Number)
  @IsInt()
  @Min(globalProductConstants.constraints.MIN_PAGES_COUNT)
  readonly page: number = globalProductConstants.default.DEFAULT_PAGE;

  @Type(() => Number)
  @IsInt()
  @Min(globalProductConstants.constraints.MIN_ITEMS_PER_PAGE)
  readonly itemsPerPage: number = globalProductConstants.default.DEFAULT_ITEMS_PER_PAGE;
}
