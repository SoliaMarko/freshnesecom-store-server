import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export interface HasValidLengthConstraintInput {
  property: string;
  min: number;
  max: number;
  each?: boolean;
  optional?: boolean;
}

@ValidatorConstraint({name: 'hasValidLength', async: false})
export class HasValidLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const {property, min, max, each, optional}: HasValidLengthConstraintInput = args.constraints[0];

    if (each) {
      return value.every((item) => {
        if (!item.hasOwnProperty(property)) return optional;
        const propertyLength = item[property].length;

        return propertyLength >= min && propertyLength <= max;
      });
    }

    if (!value.hasOwnProperty(property)) return false;
    const propertyLength = value[property].length;

    return propertyLength >= min && propertyLength <= max;
  }

  defaultMessage(args?: ValidationArguments): string {
    const {property: globalProperty} = args;
    const {property: nestedProperty, min, max}: HasValidLengthConstraintInput = args.constraints[0];

    return `${globalProperty} ${nestedProperty} must be longer than or equal to ${min} characters and shorter than or equal to ${max} characters`;
  }
}
