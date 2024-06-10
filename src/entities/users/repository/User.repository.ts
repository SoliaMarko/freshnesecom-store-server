import {UserDocument, UserResponseType} from '@customTypes/user/user.type';
import {Types} from 'mongoose';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument>;
  getRefreshTokenById(id: string): Promise<string>;
  updateTokens(user: UserDocument, accessToken: string, refreshToken: string): Promise<void>;
  clearTokens(user: UserDocument): Promise<void>;
  addToWishlist(user: UserResponseType, productIDs: Types.ObjectId[]): Promise<void>;
  removeFromWishlist(user: UserResponseType, productIDs: Types.ObjectId[]): Promise<void>;
}
