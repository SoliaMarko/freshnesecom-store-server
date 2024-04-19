const validationRules = {
  password: {
    MIN_LENGTH: 8,
    LOWERCASE_MIN_COUNT: 2,
    UPPERCASE_MIN_COUNT: 2,
    NUMBERS_MIN_COUNT: 2,
    SYMBOLS_MIN_COUNT: 2
  },
  firstName: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 30
  },
  lastName: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  }
};

export const passwordValidationRules = validationRules.password;
export const firstNameValidationRules = validationRules.firstName;
export const lastNameValidationRules = validationRules.lastName;
