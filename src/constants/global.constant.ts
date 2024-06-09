import {Order} from '@enums/sort/order.enum';
import {SortBy} from '@enums/sort/sortBy.enum';

export const globalProductConstants = {
  constraints: {
    MIN_PAGES_COUNT: 1,
    MIN_ITEMS_PER_PAGE: 1
  },
  default: {
    DEFAULT_PAGE: 0,
    DEFAULT_ITEMS_PER_PAGE: 20,
    DEFAULT_SORT_BY: SortBy.createdAt,
    DEFAULT_SORT_ORDER: Order.DESC
  }
};
