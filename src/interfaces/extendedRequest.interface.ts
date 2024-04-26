import {Request} from 'express';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';

export interface ExtendedRequest extends Request {
  user?: UserEntity;
}
