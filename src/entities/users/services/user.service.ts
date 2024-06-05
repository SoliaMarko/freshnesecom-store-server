import {Injectable} from '@nestjs/common';
import {UserEntity} from '../schemas/UserEntity.schema';
import {UserDocument, UserResponseType} from '@customTypes/user.type';
import {JwtService} from '@nestjs/jwt';
import {TokensResponseModel} from '../models/userResponses.model';
import {MongoUserRepository} from '../repository/MongoUser.repository';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private readonly repository: MongoUserRepository
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.repository.findByEmail(email);

    return user;
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.repository.findById(id);

    return user;
  }

  async getRefreshTokenById(id: string): Promise<string> {
    const refreshToken = await this.repository.getRefreshTokenById(id);

    return refreshToken;
  }

  async updateAndGetTokens(user: UserDocument): Promise<TokensResponseModel> {
    const accessTokenPayload = this.buildUserResponse(user);
    const refreshTokenPayload = {sub: user._id};
    const accessToken = this.jwtService.sign(accessTokenPayload, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES});
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES});
    await this.repository.updateTokens(user, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken
    };
  }

  async clearTokens(user: UserDocument): Promise<void> {
    await this.repository.clearTokens(user);
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
