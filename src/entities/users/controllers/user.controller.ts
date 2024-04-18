import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {CreateUserDto} from '../dto/createUser.dto';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {UserResponseType} from '@customTypes/user.type';
import {LoginDto} from '../dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(new PasswordValidationPipe()) createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.userService.createUser(createUserDto);
    console.log(user);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.userService.loginUser(loginDto);
    return this.userService.buildUserResponse(user);
  }
}
