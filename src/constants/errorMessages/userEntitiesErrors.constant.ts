import {passwordValidationRules} from '@constants/validationRules/validationRules.constant';

const generateNotEnoughMessage = (min: number, input: string): string => {
  return `For security reasons password must contain at least ${min} ${input}`;
};

const generateNotFoundMessage = (value: string): string => {
  return `Could not find the user with such ${value}`;
};

export const errorMessages = {
  email: {
    ALREADY_REGISTERED: 'This email is already taken'
  },
  password: {
    NOT_ENOUGH: {
      LOWERCASES: generateNotEnoughMessage(passwordValidationRules.LOWERCASE_MIN_COUNT, 'lowercase letters'),
      UPPERCASES: generateNotEnoughMessage(passwordValidationRules.UPPERCASE_MIN_COUNT, 'uppercase letters'),
      NUMBERS: generateNotEnoughMessage(passwordValidationRules.NUMBERS_MIN_COUNT, 'numbers'),
      SYMBOLS: generateNotEnoughMessage(passwordValidationRules.LOWERCASE_MIN_COUNT, 'symbols')
    }
  },
  NOT_FOUND_BY_EMAIL: generateNotFoundMessage('email'),
  NOT_FOUND_BY_ID: generateNotFoundMessage('id')
};

export const emailError = errorMessages.email;
export const passwordErrorNotEnough = errorMessages.password.NOT_ENOUGH;
