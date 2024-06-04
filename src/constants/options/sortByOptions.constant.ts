import {SortBy} from '@enums/sort/sortBy.enum';
import {getKeysFromEnum} from '@utils/enumTransformators/getKeysFromEnum';
import {getValuesFromEnum} from '@utils/enumTransformators/getValuesFromEnum';

export interface SortByOption {
  value: number;
  label: string;
}

const sortByKeys = getKeysFromEnum(SortBy);
const sortByValues = getValuesFromEnum(SortBy);

export const sortByOptions = sortByValues.map((sortByValue, index): SortByOption => {
  return {value: sortByValue, label: sortByKeys[index]};
});
