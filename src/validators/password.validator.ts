import * as Yup from 'yup';
import {errorMessages} from '@constants/errorMessages/userEntitiesErrors.constant';
import {regexp} from '@constants/validationRules/regexps.constant';
import {validationRules} from '@constants/validationRules/validationRules.constant';

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().min(validationRules.password.MIN_LENGTH).matches(regexp.PASSWORD, errorMessages.PASSWORD_INVALID)
});
