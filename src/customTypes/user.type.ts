import {UserEntity} from '@entities/users/schemas/UserEntity.schema';

export type UserResponseType = Omit<UserEntity, 'password' | 'phoneNumber'>;
