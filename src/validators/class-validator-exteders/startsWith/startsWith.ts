import {ValidationOptions, registerDecorator} from 'class-validator';
import {StartsWithConstraint, StartsWithConstraintInput} from './startsWithConstraint';

export const StartsWith = (options: StartsWithConstraintInput, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'starts-with',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: StartsWithConstraint
    });
  };
};
