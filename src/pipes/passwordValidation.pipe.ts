import {PipeTransform, Injectable, UnprocessableEntityException} from '@nestjs/common';
import {passwordValidationSchema} from '@validators/password.validator';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  async transform(value: string): Promise<string> {
    try {
      await passwordValidationSchema.validate(value);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }

    return value;
  }
}
