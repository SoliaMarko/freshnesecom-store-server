import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from '@entities/users/user.module';
import {AuthModule} from './entities/auth/auth.module';
import {AuthMiddleware} from '@middlewares/auth.middleware';
import {ProductModule} from '@entities/products/product.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}
