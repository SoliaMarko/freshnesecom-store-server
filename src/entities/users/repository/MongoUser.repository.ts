import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserRepository} from './User.repository';
import {UserDocument} from '@customTypes/user.type';
import {UserEntity} from '../schemas/UserEntity.schema';
import {errorMessages} from '@constants/errorMessages/errorMessages.constant';
import {UpdateWishlistDTO} from '../dto/updateWishlist.dto';
import {WishlistAction} from '@enums/user/wishlistActions.enum';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({email}).select('+password');
    if (user) return user;

    console.log('user', user);

    throw new HttpException(errorMessages.NOT_FOUND_BY_EMAIL, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (user) return user;

    throw new HttpException(errorMessages.NOT_FOUND_BY_ID, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async getRefreshTokenById(id: string): Promise<string> {
    const refreshToken = (await this.userModel.findById(id)).refreshToken;
    if (refreshToken) return refreshToken;

    throw new HttpException(errorMessages.NOT_FOUND_BY_ID, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async updateTokens(user: UserDocument, accessToken: string, refreshToken: string): Promise<void> {
    await this.userModel.updateOne({email: user.email}, {$set: {accessToken: accessToken, refreshToken: refreshToken}});
  }

  async clearTokens(user: UserDocument): Promise<void> {
    await this.userModel.updateOne({email: user.email}, {$unset: {accessToken: '', refreshToken: ''}});
  }

  async updateWishlist(user: UserDocument, updateWishlistDTO: UpdateWishlistDTO) {
    const {action, productID} = updateWishlistDTO;

    const isProductIncludedInWishlist = await this.userModel.findOne({
      email: user.email,
      wishlist: productID
    });

    if (isProductIncludedInWishlist && action === WishlistAction.add) return;

    if (action === WishlistAction.add) {
      await this.userModel.updateOne(
        {email: user.email},
        {
          $addToSet: {
            wishlist: productID
          }
        }
      );
    }

    if (action === WishlistAction.remove) {
      await this.userModel.updateOne({email: user.email}, {$pull: {wishlist: productID}});
    }
  }
}
