import {UserResponseType} from '@customTypes/user.type';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {JwtPayload} from 'jsonwebtoken';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<UserResponseType> {
    return {...payload.user};
  }
}
