import {Category} from '@enums/products/categories.enum';
import {Order} from '@enums/sort/order.enum';
import {SortBy} from '@enums/sort/sortBy.enum';

export interface FitersDTOTypes {
  page?: number;
  itemsPerPage?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  category?: Category;
  brands?: string;
  sortBy?: SortBy;
  order?: Order;
}
