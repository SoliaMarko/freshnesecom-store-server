import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProductDTO} from '../dto/Product.dto';
import {ProductRepository} from './Product.repository';
import {InjectModel} from '@nestjs/mongoose';
import {ProductEntity} from '../schemas/ProductEntity.schema';
import {Model} from 'mongoose';
import {ProductDocument, ProductResponseType} from '@customTypes/product.type';
import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';
import {ProductsStatsDTO} from '../dto/stats.dto';
import {getNumericEnumValues} from '@utils/getEnumValues';
import {Category} from '@enums/products/categories.enum';

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

  async getProductsStats(): Promise<ProductsStatsDTO> {
    const categories = getNumericEnumValues(Category);
    const quantityByCategoryArr = categories.map((category) => ({category: category, items: `$category${category}`}));
    const statsPipeline = [
      {
        $group: {
          _id: null,
          minPrice: {
            $min: {
              $multiply: ['$price', {$subtract: [1, {$divide: ['$discount', 100]}]}]
            }
          },
          maxPrice: {
            $max: {
              $multiply: ['$price', {$subtract: [1, {$divide: ['$discount', 100]}]}]
            }
          }
        }
      },
      {
        $project: {
          minPrice: 1,
          maxPrice: 1,
          quantityByCategory: quantityByCategoryArr
        }
      }
    ];

    categories.forEach((category) => {
      statsPipeline[0].$group[`category${category}`] = {
        $sum: {
          $cond: [{$eq: ['$category', category]}, 1, 0]
        }
      };
    });

    const statsAggregation = await this.productModel.aggregate(statsPipeline).then((result) => result[0]);
    const {minPrice, maxPrice, quantityByCategory} = statsAggregation;

    return {minPrice, maxPrice, quantityByCategory};
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
