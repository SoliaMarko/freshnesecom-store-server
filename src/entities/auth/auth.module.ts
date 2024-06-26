import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {UserModule} from '@entities/users/user.module';
import {UserService} from '@entities/users/services/user.service';
import {UserEntity, UserEntitySchema} from '@entities/users/schemas/UserEntity.schema';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from 'strategy/jwt.strategy';
import {RefreshJwtStrategy} from 'strategy/refresh.strategy';
import {MongoUserRepository} from '@entities/users/repository/MongoUser.repository';
import {MongoAuthRepository} from './repository/MongoAuth.repository';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, MongoAuthRepository, UserService, MongoUserRepository, JwtStrategy, RefreshJwtStrategy]
})
export class AuthModule {}
