import {ValidationOptions, registerDecorator} from 'class-validator';
import {HasValidLengthConstraint, HasValidLengthConstraintInput} from './hasValidLengthConstraint';

export const HasValidLength = (options: HasValidLengthConstraintInput, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'has-valid-length',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: HasValidLengthConstraint
    });
  };
};
