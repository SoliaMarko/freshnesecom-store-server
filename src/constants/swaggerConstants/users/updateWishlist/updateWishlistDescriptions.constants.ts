import {updateWishlistValidationRules} from '@constants/validationRules/updateWishlistValidationRules';
import {getNumericEnumValues} from '@utils/enumTransformators/getNumericEnumValues';
import {messageGenerators} from '@utils/swagger/messageGenerators';

export const descriptions = {
  ACTION: messageGenerators.generateMustAcceptValues(getNumericEnumValues(updateWishlistValidationRules.action.ENUM), 'action', 'enum'),
  WISHLIST_ITEM_DESCRIPTION: "Product's id."
};
