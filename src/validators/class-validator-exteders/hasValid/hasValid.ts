import {ValidationOptions, registerDecorator} from 'class-validator';
import {HasValidConstraint, HasValidConstraintInput} from './hasValidConstraint';

export const HasValid = (options: HasValidConstraintInput, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'has-valid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: HasValidConstraint
    });
  };
};
