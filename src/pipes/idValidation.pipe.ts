import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';
import {PipeTransform, Injectable, HttpStatus, HttpException} from '@nestjs/common';
import {Types} from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(productID: string): string {
    if (!Types.ObjectId.isValid(productID)) {
      throw new HttpException(productErrorMessages.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    return productID;
  }
}
