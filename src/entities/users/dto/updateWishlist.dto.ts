import {descriptions} from '@constants/swaggerConstants/users/updateWishlist/updateWishlistDescriptions.constants';
import {examples} from '@constants/swaggerConstants/users/updateWishlist/updateWishlistExamples.constants';
import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class UpdateWishlistDTO {
  @IsNotEmpty()
  @IsMongoId({each: true})
  @ApiProperty({description: descriptions.WISHLIST_ITEM_DESCRIPTION, example: examples.WISHLIST_ITEM_EXAMPLE, required: true})
  readonly productIDs: Types.ObjectId[];
}
