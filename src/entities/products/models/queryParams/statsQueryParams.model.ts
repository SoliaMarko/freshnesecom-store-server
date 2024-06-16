import {Type} from 'class-transformer';

export class ProductsStatsQueryParams {
  @Type(() => Number)
  readonly minPrice: number;

  @Type(() => Number)
  readonly maxPrice: number;

  @Type(() => Number)
  readonly minRating: number;

  @Type(() => Number)
  readonly maxRating: number;

  @Type(() => String)
  readonly brands: string;
}
