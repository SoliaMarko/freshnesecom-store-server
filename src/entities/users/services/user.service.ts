import {Model} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';
import {errorMessages} from '@constants/errorMessages/errorMessages.constant';
import {UserDocument, UserResponseType} from '@customTypes/user.type';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>
  ) {}

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({email}).select('+password');
    if (user) return user;

    throw new HttpException(errorMessages.NOT_FOUND_BY_EMAIL, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async findById(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findById(id);
    if (user) return user;

    throw new HttpException(errorMessages.NOT_FOUND_BY_ID, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async getRefreshTokenById(id: string): Promise<string> {
    const refreshToken = (await this.userModel.findById(id)).refreshToken;
    if (refreshToken) return refreshToken;

    throw new HttpException(errorMessages.NOT_FOUND_BY_ID, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async updateAndGetTokens(user: UserDocument): Promise<{accessToken: string; refreshToken: string}> {
    const accessTokenPayload = this.buildUserResponse(user);
    const refreshTokenPayload = {sub: user._id};

    const accessToken = this.jwtService.sign(accessTokenPayload, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES});
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES});

    await this.userModel.updateOne({email: user.email}, {$set: {accessToken: accessToken, refreshToken: refreshToken}});

    return {
      accessToken,
      refreshToken
    };
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
