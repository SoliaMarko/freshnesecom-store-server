import {globalProductConstants} from '@constants/global.constant';
import {Category} from '@enums/products/categories.enum';
import {Order} from '@enums/sort/order.enum';
import {SortBy} from '@enums/sort/sortBy.enum';
import {FitersDTOTypes} from '@interfaces/products/filters/filterDTO.interface';

export class FiltersDTO {
  constructor({
    page = globalProductConstants.default.DEFAULT_PAGE,
    itemsPerPage = globalProductConstants.default.DEFAULT_ITEMS_PER_PAGE,
    search = '',
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    category,
    brands,
    sortBy = globalProductConstants.default.DEFAULT_SORT_BY,
    order = globalProductConstants.default.DEFAULT_SORT_ORDER
  }: FitersDTOTypes) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.search = search;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minRating = minRating;
    this.maxRating = maxRating;
    this.category = category;
    this.brands = brands;
    this.sortBy = sortBy;
    this.order = order;
  }

  readonly page?: number;
  readonly itemsPerPage?: number;
  readonly search?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly category?: Category;
  readonly brands?: string;
  readonly sortBy?: SortBy;
  readonly order?: Order;
}
