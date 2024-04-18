import {passwordValidationRules} from '@constants/validationRules/validationRules.constant';

export const errorMessages = {
  email: {
    ALREADY_REGISTERED: 'This email is already taken'
  },
  password: {
    NOT_ENOUGH: {
      LOWERCASES: `For security reasons password must contain at least ${passwordValidationRules.LOWERCASE_MIN_COUNT} lowercase letters`,
      UPPERCASES: `For security reasons password must contain at least ${passwordValidationRules.UPPERCASE_MIN_COUNT} uppercase letters`,
      NUMBERS: `For security reasons password must contain at least ${passwordValidationRules.NUMBERS_MIN_COUNT} numbers`,
      SYMBOLS: `For security reasons password must contain at least ${passwordValidationRules.LOWERCASE_MIN_COUNT} symbols`
    }
  },
  NOT_FOUND_BY_EMAIL: 'Could not find the user with such email',
  NOT_FOUND_BY_ID: 'Could not find the user with such id'
};

export const emailError = errorMessages.email;
export const passwordErrorNotEnough = errorMessages.password.NOT_ENOUGH;
