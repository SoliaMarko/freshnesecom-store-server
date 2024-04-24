import {UserDocument} from '@customTypes/user.type';
import {ExecutionContext, createParamDecorator} from '@nestjs/common';

export const GetUser = createParamDecorator((_data, context: ExecutionContext): UserDocument => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});
