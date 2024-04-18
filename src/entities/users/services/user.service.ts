import {Model} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';
import {CreateUserDto} from '../dto/createUser.dto';
import {UserResponseType} from '@customTypes/user.type';
import {emailError} from '@constants/errorMessages/userEntitiesErrors.constant';
import {LoginDto} from '../dto/login.dto';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

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

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userModel.findOne({email: email});
    if (user) return user;

    throw new HttpException('Could not find the user with such email', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async getUserById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userModel.findById(id);
    if (user) return user;

    throw new HttpException('Could not find the user with such id', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async loginUser(loginDto: LoginDto): Promise<UserEntity> {
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

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      phoneNumber: userEntity.phoneNumber,
      token: this.generateJwt(userEntity)
    };
  }

  // imports: [UserModule, JwtModule.register({global: true, secret: process.env.JWT_SECRET, signOptions: {expiresIn: process.env.JWT_EXPIRES}})],

  generateJwt(userEntity: UserEntity): string {
    return sign({email: userEntity.email}, process.env.JWT_KEY);
  }
}
