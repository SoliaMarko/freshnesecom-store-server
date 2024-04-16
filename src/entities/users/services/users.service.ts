import {Model} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';
import {CreateUserDto} from '../dto/createUser.dto';
import {UserResponseType} from '@customTypes/userResponse.type';
import {errorMessages} from '@constants/errorMessages/userEntitiesErrors';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const queryByEmail = {email: createUserDto.email};
    const queryByFirstAndLastName = {
      $and: [{firstName: createUserDto.firstName}, {lastName: createUserDto.lastName}]
    };

    const userByEmail = await this.userModel.findOne(queryByEmail);
    const userByFirstAndLastName = await this.userModel.findOne(queryByFirstAndLastName);

    if (userByEmail) {
      throw new HttpException(errorMessages.EMAIL_ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (userByFirstAndLastName) {
      throw new HttpException(errorMessages.FIRST_WITH_LAST_NAME_ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
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
