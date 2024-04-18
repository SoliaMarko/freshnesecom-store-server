import {UserResponseType} from '@customTypes/user.type';
import {LoginDto} from '@entities/auth/dto/login.dto';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {Model} from 'mongoose';
import {CreateUserDto} from '../dto/createUser.dto';
import {emailError} from '@constants/errorMessages/userEntitiesErrors.constant';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      phoneNumber: userEntity.phoneNumber,
      token: this.generateJwt(userEntity)
    };
  }

  generateJwt(userEntity: UserEntity): string {
    return sign({email: userEntity.email}, process.env.JWT_KEY);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userModel.findOne({email: createUserDto.email});
    if (userByEmail) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({email: loginDto.email}).select('+password');

    if (!user) {
      throw new HttpException('Could not find such user', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException('Password is wrong', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return user;
  }
}
