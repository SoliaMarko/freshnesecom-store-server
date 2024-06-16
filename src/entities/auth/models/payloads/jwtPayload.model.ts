import {UserResponseType} from '@customTypes/user/user.type';

export interface JwtPayloadModel extends UserResponseType {
  iat: number;
  exp: number;
}

export interface RefreshPayloadModel extends JwtPayloadModel {
  sub: string;
}
