import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {UserEntity, UserEntitySchema} from './schemas/UserEntity.schema';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongoUserRepository} from './repository/MongoUser.repository';
import {ProductEntity, ProductEntitySchema} from '@entities/products/schemas/ProductEntity.schema';
import {MongoProductRepository} from '@entities/products/repository/MongoProduct.repository';
import {ProductModule} from '@entities/products/product.module';
import {ProductService} from '@entities/products/services/product.service';

@Module({
  imports: [
    ProductModule,
    UserModule,
    MongooseModule.forFeature([
      {name: UserEntity.name, schema: UserEntitySchema},
      {name: ProductEntity.name, schema: ProductEntitySchema}
    ]),
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
  providers: [UserService, MongoUserRepository, ProductService, MongoProductRepository],
  exports: [UserService]
})
export class UserModule {}
