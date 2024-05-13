export const productErrorMessages = {
  ALREADY_EXIST: 'Product with that title already exists',
  NOT_EXIST: 'Product with such ID does not exist',
  INVALID_ID: 'ID is not valid'
};

export const generateErrorPropNotManuallySettable = (prop: string): string => `${prop} cannot be set manually`;
