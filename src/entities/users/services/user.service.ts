import {Model, Types} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';
import {errorMessages} from '@constants/errorMessages/userEntitiesErrors.constant';
import {UserResponseType} from '@customTypes/user.type';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  async findByEmail({email}: {email: string}): Promise<
    | (UserEntity & {
        _id: Types.ObjectId;
      })
    | undefined
  > {
    const user = await this.userModel.findOne({email});
    if (user) return user;

    throw new HttpException(errorMessages.NOT_FOUND_BY_EMAIL, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userModel.findById(id);
    if (user) return user;

    throw new HttpException(errorMessages.NOT_FOUND_BY_ID, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      phoneNumber: userEntity.phoneNumber
    };
  }
}
