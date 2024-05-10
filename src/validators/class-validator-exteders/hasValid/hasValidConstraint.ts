import {getNumericEnumValues} from '@utils/getEnumValues';
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export interface HasValidConstraintInput {
  property: string;
  enums: any;
}

@ValidatorConstraint({name: 'hasValid', async: false})
export class HasValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const {property, enums}: HasValidConstraintInput = args.constraints[0];

    return getNumericEnumValues(enums).includes(value[property]);
  }

  defaultMessage(args?: ValidationArguments): string {
    const {property: globalProperty} = args;
    const {property: nestedProperty, enums}: HasValidConstraintInput = args.constraints[0];

    return `${globalProperty} ${nestedProperty} must be one of the following values: ${getNumericEnumValues(enums).join(', ')}`;
  }
}
