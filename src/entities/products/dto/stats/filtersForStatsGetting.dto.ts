import {FiltersForStatsGettingDTOTypes} from '@interfaces/products/filters/filtersForStatsGettingDTO.interface';

export class FiltersForStatsGettingDTO {
  constructor({minPrice, maxPrice, minRating, maxRating, brands}: FiltersForStatsGettingDTOTypes) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minRating = minRating;
    this.maxRating = maxRating;
    this.brands = brands;
  }

  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly brands?: string;
}
