import * as Yup from 'yup';
import {errorMessages} from '@constants/errorMessages/userEntitiesErrors';

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*[a-z]){2}(?=.*[A-Z]){2}(?=.*\d){2}(?=.*[!@#$%^&*]){2}.+$/, errorMessages.PASSWORD_INVALID)
});
