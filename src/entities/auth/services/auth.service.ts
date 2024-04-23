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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>
  ) {}

  async createUser(userDTO: CreateUserDTO): Promise<AuthResponse> {
    const user = await this.userModel.findOne({email: userDTO.email});
    if (user) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(userDTO);
    await newUser.save();
    const accessTokenPayload = {...this.userService.buildUserResponse(newUser)};
    const refreshTokenPayload = {sub: newUser._id};

    return {
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      accessToken: this.jwtService.sign(accessTokenPayload),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES})
    };
  }

  async login(loginDTO: LoginDTO): Promise<AuthResponse> {
    const user = await this.userService.findByEmail({email: loginDTO.email});
    const isPasswordCorrect = await compare(loginDTO.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(errorMessages.password.WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const accessTokenPayload = {...this.userService.buildUserResponse(user)};
    const refreshTokenPayload = {sub: user._id};

    return {
      fullName: `${user.firstName} ${user.lastName}`,
      accessToken: this.jwtService.sign(accessTokenPayload),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES})
    };
  }

  async refreshToken(user: UserEntity): Promise<{accessToken: string}> {
    const payload = {...this.userService.buildUserResponse(user)};

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  verifyToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify(token);
  }
}
