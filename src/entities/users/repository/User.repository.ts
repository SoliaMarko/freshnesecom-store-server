import {UserDocument} from '@customTypes/user.type';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument>;
  getRefreshTokenById(id: string): Promise<string>;
  updateTokens(user: UserDocument, accessToken: string, refreshToken: string): Promise<void>;
  clearTokens(user: UserDocument): Promise<void>;
}
