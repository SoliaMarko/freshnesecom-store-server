import {UserResponseType} from '@customTypes/user.type';

export interface SignupResponse {
  success: boolean;
  user: UserResponseType;
}

export interface LoginResponse {
  user?: UserResponseType;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  status: string;
}

export interface RefreshTokenResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
}
