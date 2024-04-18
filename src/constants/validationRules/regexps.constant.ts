import {passwordValidationRules} from './validationRules.constant';

const strRegexp = {
  password: {
    LOWERCASES_COUNT: `^(?=.*[a-z]){${passwordValidationRules.LOWERCASE_MIN_COUNT},}.+$`,
    UPPERCASES_COUNT: `^(?=.*[A-Z]){${passwordValidationRules.UPPERCASE_MIN_COUNT},}.+$`,
    NUMBERS_COUNT: `^(?=.*[0-9]){${passwordValidationRules.NUMBERS_MIN_COUNT},}.+$`,
    SYMBOLS_COUNT: `^(?=.*[!@#$%^&*_\`+=|~<>()]){${passwordValidationRules.SYMBOLS_MIN_COUNT},}.+$`
  }
};

const passwordStrRegexp = strRegexp.password;

const regexp = {
  password: {
    LOWERCASES_COUNT: new RegExp(passwordStrRegexp.LOWERCASES_COUNT),
    UPPERCASES_COUNT: new RegExp(passwordStrRegexp.UPPERCASES_COUNT),
    NUMBERS_COUNT: new RegExp(passwordStrRegexp.NUMBERS_COUNT),
    SYMBOLS_COUNT: new RegExp(passwordStrRegexp.SYMBOLS_COUNT)
  }
};

export const passwordRegexp = regexp.password;
