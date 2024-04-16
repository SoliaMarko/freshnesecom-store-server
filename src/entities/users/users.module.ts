import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersController} from './controllers/users.controller';
import {UsersService} from './services/users.service';
import {UserEntity, UserEntitySchema} from './schemas/UserEntity.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UserModule {}
