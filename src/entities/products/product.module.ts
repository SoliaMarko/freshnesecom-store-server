import {Module} from '@nestjs/common';
import {ProductController} from './controllers/product.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductEntity, ProductEntitySchema} from './schemas/ProductEntity.schema';
import {ConfigModule} from '@nestjs/config';
import {ProductService} from './services/product.service';
import {MongoProductRepository} from './repository/MongoProduct.repository';

@Module({
  imports: [ProductModule, MongooseModule.forFeature([{name: ProductEntity.name, schema: ProductEntitySchema}]), ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [ProductService, MongoProductRepository]
})
export class ProductModule {}
