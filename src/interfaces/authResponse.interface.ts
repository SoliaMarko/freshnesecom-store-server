import {UserResponseType} from '@customTypes/user.type';

export interface AuthResponse {
  user?: UserResponseType;
  accessToken: string;
  refreshToken: string;
}
