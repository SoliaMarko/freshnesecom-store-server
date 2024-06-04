export class ProductsStatsDTO {
  constructor(minPrice: number, maxPrice: number, quantityByCategory: {category: number; quantity: number}[]) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.quantityByCategory = [...quantityByCategory];
  }

  readonly minPrice: number;
  readonly maxPrice: number;
  readonly quantityByCategory: {category: number; quantity: number}[];
}
