import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDTO} from '../dto/createUser.dto';
import {LoginDTO} from '../dto/login.dto';
import {refreshJwtAuthGuard} from '@guards/refresh-jwt-auth.guard';
import {UserService} from '@entities/users/services/user.service';
import {LoginResponse, LogoutResponse, RefreshTokenResponse, SignupResponse} from '../models/responses.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body(new PasswordValidationPipe()) createUserDTO: CreateUserDTO): Promise<SignupResponse> {
    return this.authService.signup(createUserDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<LoginResponse> {
    return this.authService.login(loginDTO);
  }

  @Post('logout')
  async logout(@Body() {email}: {email: string}): Promise<LogoutResponse> {
    return this.authService.logout(email);
  }

  @UseGuards(refreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() jwt: {refresh: string}): Promise<RefreshTokenResponse> {
    const {sub: user_id} = this.authService.verifyToken(jwt.refresh);
    const user = await this.userService.findById(user_id);

    return this.authService.refreshToken(jwt.refresh, user);
  }
}
