import {SortByOption} from '@constants/options/sortByOptions.constant';

export const getLabelByValue = (options: SortByOption[], value: number): string =>
  options.find((option) => option.value === value)?.label || options[0].label;
