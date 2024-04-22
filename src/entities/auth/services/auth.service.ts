import {LoginDTO} from '@entities/auth/dto/login.dto';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {compare} from 'bcryptjs';
import {Model} from 'mongoose';
import {CreateUserDTO} from '../dto/createUser.dto';
import {emailError} from '@constants/errorMessages/userEntitiesErrors.constant';
import {UserService} from '@entities/users/services/user.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>
  ) {}

  async createUser(userDTO: CreateUserDTO): Promise<{accessToken: string}> {
    const user = await this.userModel.findOne({email: userDTO.email});
    if (user) {
      throw new HttpException(emailError.ALREADY_REGISTERED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new this.userModel(userDTO);
    await newUser.save();
    const payload = {...this.userService.buildUserResponse(newUser)};

    return {accessToken: this.jwtService.sign(payload)};
  }

  async login(loginDTO: LoginDTO): Promise<{accessToken: string}> {
    const user = await this.userService.findByEmail(loginDTO.email);
    const isPasswordCorrect = await compare(loginDTO.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Password is wrong', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const payload = {...this.userService.buildUserResponse(user)};

    return {accessToken: this.jwtService.sign(payload)};
  }
}
