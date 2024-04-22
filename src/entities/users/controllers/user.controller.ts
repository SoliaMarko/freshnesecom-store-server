import {Controller, Get, HttpException, HttpStatus, Request} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {UserResponseType} from '@customTypes/user.type';
import {ExtendedRequest} from '@middlewares/auth.middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async currentUser(@Request() request: ExtendedRequest): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.userService.buildUserResponse(request.user);
  }
}
