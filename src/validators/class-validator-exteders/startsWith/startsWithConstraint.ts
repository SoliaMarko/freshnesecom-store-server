import {AdditionalDescription} from '@entities/products/models/properties/additionalDescription.model';
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export interface StartsWithConstraintInput {
  property: string;
}

@ValidatorConstraint({name: 'startsWithConstraint', async: false})
export class StartsWithConstraint implements ValidatorConstraintInterface {
  validate(values: [AdditionalDescription], args?: ValidationArguments): boolean {
    const {property} = args.constraints[0];

    return values.toString().startsWith(args.object[property]);
  }

  defaultMessage(args?: ValidationArguments): string {
    const {property: globalProperty} = args;
    const {property: validationProperty} = args.constraints[0];

    return `${globalProperty} must start with the same value as ${validationProperty} is (here it is ${args.object[validationProperty]})`;
  }
}
