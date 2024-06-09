import {UserResponseType} from '@customTypes/user/user.type';

export interface SignupResponseModel {
  success: boolean;
  user: UserResponseType;
}

export interface LoginResponseModel {
  user?: UserResponseType;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponseModel {
  status: string;
}

export interface RefreshTokenResponseModel {
  status: string;
  accessToken: string;
  refreshToken: string;
}
