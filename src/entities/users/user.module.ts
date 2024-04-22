import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {UserEntity, UserEntitySchema} from './schemas/UserEntity.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}