import {LoginDTO} from '@entities/auth/dto/login.dto';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {compare} from 'bcryptjs';
import {Model} from 'mongoose';
import {CreateUserDTO} from '../dto/createUser.dto';
import {emailError, errorMessages} from '@constants/errorMessages/userEntitiesErrors.constant';
import {UserService} from '@entities/users/services/user.service';
import {JwtService} from '@nestjs/jwt';
import {RefreshTokenPayload} from '@interfaces/refreshTokenPayload.interface';
import {AuthResponse} from '@interfaces/authResponse.interface';
import {UserDocument, UserResponseType} from '@customTypes/user.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>
  ) {}

  async signup(userDTO: CreateUserDTO): Promise<{success: boolean; user: UserResponseType}> {
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

  async login(loginDTO: LoginDTO): Promise<AuthResponse> {
    const user = await this.userService.findByEmail({email: loginDTO.email});
    const isPasswordCorrect = await compare(loginDTO.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(errorMessages.password.WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const {accessToken, refreshToken} = await this.userService.updateAndGetTokens(user);

    return {
      user: this.userService.buildUserResponse(user),
      accessToken,
      refreshToken
    };
  }

  async refreshToken(refreshToken: string, user: UserDocument): Promise<{status: string; accessToken: string; refreshToken: string}> {
    const savedRefreshToken = await this.userService.getRefreshTokenById(user._id.toString());

    if (refreshToken !== savedRefreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNPROCESSABLE_ENTITY);
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
