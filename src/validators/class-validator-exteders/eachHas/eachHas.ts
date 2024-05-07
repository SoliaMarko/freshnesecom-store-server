import {ValidationOptions, registerDecorator} from 'class-validator';
import {EachHasConstraint, EachHasConstraintInput} from './eachHasConstraint';

export const EachHas = (options: EachHasConstraintInput, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'each-has',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: EachHasConstraint
    });
  };
};
