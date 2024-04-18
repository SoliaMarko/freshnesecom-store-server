import {Model} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';
import {CreateUserDto} from '../dto/createUser.dto';
import {UserResponseType} from '@customTypes/user.type';
import {emailError} from '@constants/errorMessages/userEntitiesErrors.constant';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userModel.findOne({email: createUserDto.email});
    if (userByEmail) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email
    };
  }
}
