import {descriptions} from '@constants/swaggerConstants/users/updateWishlist/updateWishlistDescriptions.constants';
import {examples} from '@constants/swaggerConstants/users/updateWishlist/updateWishlistExamples.constants';
import {updateWishlistValidationRules} from '@constants/validationRules/updateWishlistValidationRules';
import {WishlistAction} from '@enums/user/wishlistActions.enum';
import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class UpdateWishlistDTO {
  @IsEnum(updateWishlistValidationRules.action.ENUM)
  @ApiProperty({description: descriptions.ACTION_DESCRIPTION, example: examples.ACTION_EXAMPLE, required: true})
  readonly action: WishlistAction;

  @IsNotEmpty()
  @IsMongoId({each: true})
  @ApiProperty({description: descriptions.WISHLIST_ITEM_DESCRIPTION, example: examples.WISHLIST_ITEM_EXAMPLE, required: true})
  readonly productIDs: Types.ObjectId[];
}
