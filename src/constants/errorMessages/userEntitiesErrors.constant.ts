import {passwordValidationRules} from '@constants/validationRules/validationRules.constant';

const errorMessagesGenerator = {
  generateNotEnoughMessage: (min: number, input: string): string => {
    return `For security reasons password must contain at least ${min} ${input}`;
  },

  generateNotFoundMessage: (value: string): string => {
    return `Could not find the user with such ${value}`;
  }
};

export const errorMessages = {
  email: {
    ALREADY_REGISTERED: 'This email is already taken'
  },
  password: {
    NOT_ENOUGH: {
      LOWERCASES: errorMessagesGenerator.generateNotEnoughMessage(passwordValidationRules.LOWERCASE_MIN_COUNT, 'lowercase letters'),
      UPPERCASES: errorMessagesGenerator.generateNotEnoughMessage(passwordValidationRules.UPPERCASE_MIN_COUNT, 'uppercase letters'),
      NUMBERS: errorMessagesGenerator.generateNotEnoughMessage(passwordValidationRules.NUMBERS_MIN_COUNT, 'numbers'),
      SYMBOLS: errorMessagesGenerator.generateNotEnoughMessage(passwordValidationRules.LOWERCASE_MIN_COUNT, 'symbols')
    },
    WRONG: 'Password is wrong'
  },
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND_BY_EMAIL: errorMessagesGenerator.generateNotFoundMessage('email'),
  NOT_FOUND_BY_ID: errorMessagesGenerator.generateNotFoundMessage('id')
};

export const emailError = errorMessages.email;
export const passwordErrorNotEnough = errorMessages.password.NOT_ENOUGH;
