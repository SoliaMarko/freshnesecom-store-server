import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProductDTO} from '../dto/Product.dto';
import {ProductRepository} from './Product.repository';
import {InjectModel} from '@nestjs/mongoose';
import {ProductEntity} from '../schemas/ProductEntity.schema';
import {Model} from 'mongoose';
import {ProductDocument, ProductResponseType} from '@customTypes/product.type';
import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';

@Injectable()
export class MongoProductRepository implements ProductRepository {
  constructor(@InjectModel(ProductEntity.name) public productModel: Model<ProductDocument>) {}

  async createProduct(productDTO: ProductDTO): Promise<ProductResponseType> {
    const product = await this.productModel.findOne({title: productDTO.title});
    if (product) {
      throw new HttpException(productErrorMessages.ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newProduct = new this.productModel({...productDTO, price: productDTO.price.toFixed(2)});

    return await newProduct.save();
  }

  async getAllProducts(page: number, itemsPerPage: number): Promise<GetAllProductsRepositoryType> {
    const products = await this.productModel
      .find()
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .exec();
    const itemsCount = await this.productModel.countDocuments();

    return {products, itemsCount};
  }

  async getProductById(productID: string): Promise<ProductResponseType> {
    const product = await this.productModel.findById(productID);
    if (!product) {
      throw new HttpException(productErrorMessages.NOT_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return await this.productModel.findById(productID);
  }

  async updateProduct(productID: string, productDTO: ProductDTO): Promise<ProductResponseType> {
    const product = await this.productModel.findById(productID);
    if (!product) {
      throw new HttpException(productErrorMessages.NOT_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const productWithSameTitle = await this.productModel.findOne({title: productDTO.title});
    if (productWithSameTitle) {
      throw new HttpException(productErrorMessages.ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return await this.productModel.findByIdAndUpdate(productID, {...productDTO, price: productDTO.price.toFixed(2)}, {new: true});
  }
}
