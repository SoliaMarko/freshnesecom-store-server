// import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class ProductsFromWishlistDTO {
  @IsNotEmpty()
  @IsMongoId({each: true})
  // @ApiProperty({description: descriptions.FIRST_NAME_DESCRIPTION, example: examples.FIRST_NAME_EXAMPLE, required: true})
  readonly productIDs: Types.ObjectId[];
}
