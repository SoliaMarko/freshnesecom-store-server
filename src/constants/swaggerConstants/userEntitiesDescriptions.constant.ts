import {firstNameValidationRules, lastNameValidationRules, passwordValidationRules} from '@constants/validationRules/validationRules.constant';

export const descriptions = {
  FIRST_NAME_DESCRIPTION: `User's first name. Must be between ${firstNameValidationRules.MIN_LENGTH} and ${firstNameValidationRules.MAX_LENGTH} characters long`,
  LAST_NAME_DESCRIPTION: `User's last name. Must be between ${lastNameValidationRules.MIN_LENGTH} and ${lastNameValidationRules.MAX_LENGTH} characters long`,
  EMAIL_DESCRIPTION: 'Email, must be unique',
  PASSWORD_DESCRIPTION: `Password, must contain at least ${passwordValidationRules.MIN_LENGTH} characters: 
  ${passwordValidationRules.LOWERCASE_MIN_COUNT} lowercase letters, 
  ${passwordValidationRules.UPPERCASE_MIN_COUNT} uppercase letters, 
  ${passwordValidationRules.NUMBERS_MIN_COUNT} numbers 
  and ${passwordValidationRules.SYMBOLS_MIN_COUNT} symbols`,
  PHONE_NUMBER_DESCRIPTION: 'Phone number, optional field. It must start with the international calling code (e.g. +41)'
};
