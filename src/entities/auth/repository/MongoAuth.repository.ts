import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserDocument} from '@customTypes/user.type';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {CreateUserDTO} from '../dto/createUser.dto';
import {AuthRepository} from './Auth.repository';
import {emailError} from '@constants/errorMessages/errorMessages.constant';

@Injectable()
export class MongoAuthRepository implements AuthRepository {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) {}

  async signup(userDTO: CreateUserDTO): Promise<CreateUserDTO> {
    const user = await this.userModel.findOne({email: userDTO.email});
    if (user) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(userDTO);
    await newUser.save();

    return newUser;
  }
}
