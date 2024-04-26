import {LoginDTO} from '@entities/auth/dto/login.dto';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {compare} from 'bcryptjs';
import {Model} from 'mongoose';
import {CreateUserDTO} from '../dto/createUser.dto';
import {emailError, errorMessages} from '@constants/errorMessages/errorMessages.constant';
import {UserService} from '@entities/users/services/user.service';
import {JwtService} from '@nestjs/jwt';
import {RefreshTokenPayload} from '@interfaces/refreshTokenPayload.interface';
import {UserDocument} from '@customTypes/user.type';
import {LoginResponse, LogoutResponse, RefreshTokenResponse, SignupResponse} from '../models/responses.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>
  ) {}

  async signup(userDTO: CreateUserDTO): Promise<SignupResponse> {
    const user = await this.userModel.findOne({email: userDTO.email});
    if (user) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(userDTO);
    await newUser.save();

    return {
      success: true,
      user: this.userService.buildUserResponse(newUser)
    };
  }

  async login(loginDTO: LoginDTO): Promise<LoginResponse> {
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

  async logout(email: string): Promise<LogoutResponse> {
    const user = await this.userService.findByEmail(email);
    await this.userService.clearTokens(user);

    return {
      status: 'success'
    };
  }

  async refreshToken(refreshToken: string, user: UserDocument): Promise<RefreshTokenResponse> {
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

  verifyToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify(token);
  }
}
