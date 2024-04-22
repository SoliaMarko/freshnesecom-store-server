import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDTO} from '../dto/createUser.dto';
import {LoginDTO} from '../dto/login.dto';
import {jwtAuthGuard} from '@guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{accessToken: string}> {
    return this.authService.login(loginDTO);
  }

  @Post('signup')
  async createUser(@Body(new PasswordValidationPipe()) createUserDTO: CreateUserDTO): Promise<{accessToken: string}> {
    return this.authService.createUser(createUserDTO);
  }

  @UseGuards(jwtAuthGuard)
  @Post('secured')
  test() {
    return true;
  }
}
