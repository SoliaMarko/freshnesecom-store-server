import * as Yup from 'yup';
import {passwordErrorNotEnough} from '@constants/errorMessages/errorMessages.constant';
import {passwordRegexp} from '@constants/validationRules/regexps.constant';
import {passwordValidationRules} from '@constants/validationRules/validationRules.constant';

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(passwordValidationRules.MIN_LENGTH)
    .matches(passwordRegexp.LOWERCASES_COUNT, passwordErrorNotEnough.LOWERCASES)
    .matches(passwordRegexp.UPPERCASES_COUNT, passwordErrorNotEnough.UPPERCASES)
    .matches(passwordRegexp.NUMBERS_COUNT, passwordErrorNotEnough.NUMBERS)
    .matches(passwordRegexp.SYMBOLS_COUNT, passwordErrorNotEnough.SYMBOLS)
});
