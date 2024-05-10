import {ProductDocument} from '@customTypes/product.type';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ProductEntity} from '../schemas/ProductEntity.schema';
import {CreateProductDTO} from '../dto/createProduct.dto';
import {CreateProductResponseModel} from '../models/productResponses.model';
import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductEntity.name) public productModel: Model<ProductDocument>) {}

  async createProduct(productDTO: CreateProductDTO): Promise<CreateProductResponseModel> {
    const product = await this.productModel.findOne({title: productDTO.title});
    if (product) {
      throw new HttpException(productErrorMessages.ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newProduct = new this.productModel({...productDTO, price: productDTO.price.toFixed(2)});
    await newProduct.save();

    return {
      success: true,
      data: {product: newProduct}
    };
  }
}
