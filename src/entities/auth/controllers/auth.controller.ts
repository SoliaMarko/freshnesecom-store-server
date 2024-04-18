import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {LoginDto} from '@entities/auth/dto/login.dto';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDto} from '../dto/createUser.dto';
import {UserResponseType} from '@customTypes/user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return this.authService.buildUserResponse(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async createUser(@Body(new PasswordValidationPipe()) createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.authService.createUser(createUserDto);
    return this.authService.buildUserResponse(user);
  }
}
