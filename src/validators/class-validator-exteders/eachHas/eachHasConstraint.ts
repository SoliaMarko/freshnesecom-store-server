import {AdditionalDescription} from '@entities/products/models/additionalDescription.model';
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export interface EachHasConstraintInput {
  property: string;
}

@ValidatorConstraint({name: 'eachHasConstraint', async: false})
export class EachHasConstraint implements ValidatorConstraintInterface {
  validate(values: [AdditionalDescription], args?: ValidationArguments): boolean {
    const {property} = args.constraints[0];

    return values.every((value) => value[property]);
  }

  defaultMessage(args?: ValidationArguments): string {
    const {property: globalProperty} = args;
    const {property: nestedProperty} = args.constraints[0];

    return `each object in ${globalProperty} must include ${nestedProperty} property`;
  }
}
