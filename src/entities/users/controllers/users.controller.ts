import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from '../services/users.service';
import {CreateUserDto} from '../dto/createUser.dto';
import {PasswordValidationPipe} from '@pipes/passwordValidation.pipe';
import {UserResponseType} from '@customTypes/userResponse.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body(new PasswordValidationPipe()) createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.usersService.createUser(createUserDto);

    return this.usersService.buildUserResponse(user);
  }
}
