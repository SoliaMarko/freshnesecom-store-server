import {Model} from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserEntity} from '../schemas/UserEntity.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userModel.findOne({email: email});
    if (user) return user;

    throw new HttpException('Could not find the user with such email', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userModel.findById(id);
    if (user) return user;

    throw new HttpException('Could not find the user with such id', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
