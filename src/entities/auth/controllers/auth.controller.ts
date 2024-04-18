import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {CreateUserDTO} from '../dto/createUser.dto';
import {LoginDTO} from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<string> {
    return this.authService.login(loginDTO);
  }

  @Post('signup')
  async createUser(@Body(new PasswordValidationPipe()) createUserDTO: CreateUserDTO): Promise<string> {
    return this.authService.createUser(createUserDTO);
  }
}
