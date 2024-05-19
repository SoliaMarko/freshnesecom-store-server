export type ProductStatsResponseType = {
  minPrice: number;
  maxPrice: number;
  quantityByCategory: {category: number; items: number}[];
};
