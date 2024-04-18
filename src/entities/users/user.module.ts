import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {UserEntity, UserEntitySchema} from './schemas/UserEntity.schema';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}]),
    JwtModule.register({global: true, secret: process.env.JWT_SECRET, signOptions: {expiresIn: process.env.JWT_EXPIRES}})
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
