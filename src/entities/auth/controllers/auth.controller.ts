import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDTO} from '../dto/createUser.dto';
import {LoginDTO} from '../dto/login.dto';
import {refreshJwtAuthGuard} from '@guards/refresh-jwt-auth.guard';
import {UserService} from '@entities/users/services/user.service';
import {LoginResponseModel, LogoutResponseModel, RefreshTokenResponseModel, SignupResponseModel} from '../models/responses/authResponses.model';
import {ApiAuth} from 'decorators/swagger/auth/apiAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  @ApiAuth()
  async signup(@Body(new PasswordValidationPipe()) userDTO: CreateUserDTO): Promise<SignupResponseModel> {
    return this.authService.signup(userDTO);
  }

  @Post('login')
  @ApiAuth()
  async login(@Body() loginDTO: LoginDTO): Promise<LoginResponseModel> {
    return this.authService.login(loginDTO);
  }

  @Post('logout')
  @ApiAuth()
  async logout(@Body() {email}: {email: string}): Promise<LogoutResponseModel> {
    return this.authService.logout(email);
  }

  @UseGuards(refreshJwtAuthGuard)
  @Post('refresh')
  @ApiAuth()
  async refreshToken(@Body() jwt: {refresh: string}): Promise<RefreshTokenResponseModel> {
    const {sub: user_id} = this.authService.verifyToken(jwt.refresh);
    const user = await this.userService.findById(user_id);

    return this.authService.refreshToken(jwt.refresh, user);
  }
}
