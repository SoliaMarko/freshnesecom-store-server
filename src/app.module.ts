import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './features/auth/auth.module';
import {ProductModule} from './features/product/product.module';
import {UserModule} from './features/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProductModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
