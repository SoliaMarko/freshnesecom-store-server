import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {UserEntity, UserEntitySchema} from './schemas/UserEntity.schema';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
