import {HydratedDocument} from 'mongoose';
import {UserEntity} from '@entities/users/schemas/UserEntity.schema';

export type UserDocument = HydratedDocument<UserEntity>;

export type UserResponseType = Omit<UserEntity, 'password' | 'phoneNumber'>;
