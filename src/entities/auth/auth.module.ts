import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {UserModule} from '@entities/users/user.module';
import {UserService} from '@entities/users/services/user.service';
import {UserEntity, UserEntitySchema} from '@entities/users/schemas/UserEntity.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [UserModule, UserEntity, MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}])],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
