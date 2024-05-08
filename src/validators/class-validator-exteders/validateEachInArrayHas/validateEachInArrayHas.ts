import {ValidationOptions, registerDecorator} from 'class-validator';
import {ValidateEachInArrayHasConstraint, ValidateEachInArrayHasConstraintInput} from './validateEachInArrayHasConstraint';

export const ValidateEachInArrayHas = (options: ValidateEachInArrayHasConstraintInput, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'validate-each-in-array-has',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: ValidateEachInArrayHasConstraint
    });
  };
};
