import {JwtPayloadModel} from '@entities/auth/models/payloads/jwtPayload.model';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {UserService} from '@entities/users/services/user.service';
import {ExtendedRequest} from '@interfaces/extendedRequest.interface';
import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: ExtendedRequest, _res: Response, next: NextFunction): Promise<UserEntity> | undefined {
    const token = req.headers['authorization'];
    if (!token) {
      req.user = null;
      next();
      return;
    }

    try {
      const decode = verify(token, process.env.JWT_SECRET) as JwtPayloadModel;
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
