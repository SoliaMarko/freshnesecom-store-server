import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from '@entities/users/user.module';
import {AuthModule} from './entities/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
