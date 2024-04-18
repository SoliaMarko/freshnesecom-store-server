import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {CreateUserDto} from '../dto/createUser.dto';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {UserResponseType} from '@customTypes/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body(new PasswordValidationPipe()) createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.usersService.createUser(createUserDto);

    return this.usersService.buildUserResponse(user);
  }
}
