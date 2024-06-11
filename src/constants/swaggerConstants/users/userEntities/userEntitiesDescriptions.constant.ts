import {firstNameValidationRules, lastNameValidationRules, passwordValidationRules} from '@constants/validationRules/validationRules.constant';

const generateMustBeInRangeMessage = (field = '', min: number, max: number): string => {
  return `User's ${field}. Must be between ${min} and ${max} characters long`;
};

export const descriptions = {
  FIRST_NAME_DESCRIPTION: generateMustBeInRangeMessage('first name', firstNameValidationRules.MIN_LENGTH, firstNameValidationRules.MAX_LENGTH),
  LAST_NAME_DESCRIPTION: generateMustBeInRangeMessage('last name', lastNameValidationRules.MIN_LENGTH, lastNameValidationRules.MAX_LENGTH),
  EMAIL_DESCRIPTION: 'Email, must be unique',
  PASSWORD_DESCRIPTION: `Password, must contain at least ${passwordValidationRules.MIN_LENGTH} characters: 
  ${passwordValidationRules.LOWERCASE_MIN_COUNT} lowercase letters, 
  ${passwordValidationRules.UPPERCASE_MIN_COUNT} uppercase letters, 
  ${passwordValidationRules.NUMBERS_MIN_COUNT} numbers 
  and ${passwordValidationRules.SYMBOLS_MIN_COUNT} symbols`,
  PHONE_NUMBER_DESCRIPTION: 'Phone number, optional field. It must start with the international calling code (e.g. +41)',
  WISHLIST_DESCRIPTION: 'Wishlist with products id-s. It is array which contains of strings (valid mongoose id-s)'
};
