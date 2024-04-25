import {UserEntity} from '@entities/users/schemas/UserEntity.schema';
import {UserService} from '@entities/users/services/user.service';
import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';

export interface ExtendedRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction): Promise<UserEntity> | undefined {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'];

    try {
      const decode = verify(token, process.env.JWT_SECRET) as {email: string};
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
