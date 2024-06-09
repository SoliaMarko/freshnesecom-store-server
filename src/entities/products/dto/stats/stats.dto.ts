import {QuantityByCategoryType} from '@customTypes/quantityByCategory.type';

export class ProductsStatsDTO {
  constructor(minPrice: number, maxPrice: number, quantityByCategory: QuantityByCategoryType[]) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.quantityByCategory = [...quantityByCategory];
  }

  readonly minPrice: number;
  readonly maxPrice: number;
  readonly quantityByCategory: QuantityByCategoryType[];
}
