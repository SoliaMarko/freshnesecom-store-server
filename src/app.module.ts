import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './features/auth/auth.module';
import {ProductModule} from './features/product/product.module';
import {UserModule} from 'features/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), AuthModule, ProductModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
