import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDTO} from '../dto/createUser.dto';
import {LoginDTO} from '../dto/login.dto';
import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {refreshJwtAuthGuard} from '@guards/refresh-jwt-auth.guard';
import {UserService} from '@entities/users/services/user.service';
import {UserResponseType} from '@customTypes/user.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body(new PasswordValidationPipe()) createUserDTO: CreateUserDTO): Promise<{success: boolean; user: UserResponseType}> {
    return this.authService.signup(createUserDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{accessToken: string}> {
    return this.authService.login(loginDTO);
  }

  @Post('logout')
  async logout(@Body() {email}: {email: string}): Promise<{accessToken: string}> {
    return this.authService.logout(email);
  }

  @UseGuards(refreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() jwt: {refresh: string}): Promise<{accessToken: string}> {
    const {sub: user_id} = this.authService.verifyToken(jwt.refresh);
    const user = await this.userService.findById(user_id);

    return this.authService.refreshToken(jwt.refresh, user);
  }

  @UseGuards(jwtAuthGuard)
  @Post('secured')
  test() {
    return true;
  }
}
