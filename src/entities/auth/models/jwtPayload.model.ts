import {UserResponseType} from '@customTypes/user.type';

export interface JwtPayloadModel extends UserResponseType {
  iat: number;
  exp: number;
}
