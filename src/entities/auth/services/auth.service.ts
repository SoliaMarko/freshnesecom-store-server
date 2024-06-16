import {LoginDTO} from '@entities/auth/dto/login.dto';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {compare} from 'bcryptjs';
import {CreateUserDTO} from '../dto/createUser.dto';
import {errorMessages} from '@constants/errorMessages/errorMessages.constant';
import {UserService} from '@entities/users/services/user.service';
import {JwtService} from '@nestjs/jwt';
import {UserDocument} from '@customTypes/user/user.type';
import {LoginResponseModel, LogoutResponseModel, RefreshTokenResponseModel, SignupResponseModel} from '../models/responses/authResponses.model';
import {RefreshPayloadModel} from '../models/payloads/jwtPayload.model';
import {MongoAuthRepository} from '../repository/MongoAuth.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private readonly repository: MongoAuthRepository
  ) {}

  async signup(userDTO: CreateUserDTO): Promise<SignupResponseModel> {
    const newUser = await this.repository.signup(userDTO);

    return {
      success: true,
      user: this.userService.buildUserResponse(newUser)
    };
  }

  async login(loginDTO: LoginDTO): Promise<LoginResponseModel> {
    const user = await this.userService.findByEmail(loginDTO.email);
    const isPasswordCorrect = await compare(loginDTO.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(errorMessages.password.INVALID, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const {accessToken, refreshToken} = await this.userService.updateAndGetTokens(user);

    return {
      user: this.userService.buildUserResponse(user),
      accessToken,
      refreshToken
    };
  }

  async logout(email: string): Promise<LogoutResponseModel> {
    const user = await this.userService.findByEmail(email);
    await this.userService.clearTokens(user);

    return {
      status: 'success'
    };
  }

  async refreshToken(refreshToken: string, user: UserDocument): Promise<RefreshTokenResponseModel> {
    const savedRefreshToken = await this.userService.getRefreshTokenById(user._id.toString());
    if (refreshToken !== savedRefreshToken) {
      throw new HttpException(errorMessages.refresh_token.INVALID, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const {accessToken: updatedAccessToken, refreshToken: updatedRefreshToken} = await this.userService.updateAndGetTokens(user);

    return {
      status: 'success',
      accessToken: updatedAccessToken,
      refreshToken: updatedRefreshToken
    };
  }

  verifyToken(token: string): RefreshPayloadModel {
    return this.jwtService.verify(token);
  }
}
