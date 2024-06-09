export const productErrorMessages = {
  ALREADY_EXISTED_TITLE: 'Product with that title already exists',
  NOT_EXIST_WITH_ID: 'Product with such ID does not exist',
  INVALID_ID: 'ID is not valid',
  NOT_FOUND_BY_PARAMS: 'There is no products with provided params'
};

export const generateErrorPropNotManuallySettable = (prop: string): string => `${prop} cannot be set manually`;
