import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {UserResponseType} from '@customTypes/user.type';
import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {JwtService} from '@nestjs/jwt';
import {ExtendedRequest} from '@interfaces/extendedRequest.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  @UseGuards(jwtAuthGuard)
  @Get()
  async getCurrentUser(@Request() request: ExtendedRequest): Promise<UserResponseType> {
    const accessToken = request.get('authorization').split(' ')[1];
    const {email} = this.jwtService.verify(accessToken);
    const user = await this.userService.findByEmail(email);

    return this.userService.buildUserResponse(user);
  }
}
