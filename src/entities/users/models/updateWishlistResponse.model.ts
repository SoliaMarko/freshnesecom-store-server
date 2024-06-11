import {Types} from 'mongoose';

export interface UpdateWishlistResponse {
  success: boolean;
  productIDs: Types.ObjectId[];
}
