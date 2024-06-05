import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProductDTO} from '../dto/Product.dto';
import {ProductRepository} from './Product.repository';
import {InjectModel} from '@nestjs/mongoose';
import {ProductEntity} from '../schemas/ProductEntity.schema';
import {Model} from 'mongoose';
import {ProductDocument, ProductResponseType} from '@customTypes/product.type';
import {productErrorMessages} from '@constants/errorMessages/productErrorMessages.constant';
import {GetAllProductsRepositoryType} from '@customTypes/getAllProductsRepository.type';
import {ProductsStatsDTO} from '../dto/stats/stats.dto';
import {Category} from '@enums/products/categories.enum';
import {getNumericEnumValues} from '@utils/enumTransformators/getNumericEnumValues';
import {getLabelByValue} from '@utils/enumTransformators/getLabelByValue';
import {sortByOptions} from '@constants/options/sortByOptions.constant';
import {FiltersDTO} from '../dto/products/filters.dto';
import {Brand} from '@enums/products/brands.enum';
import {FiltersForStatsGettingDTO} from '../dto/stats/filtersForStatsGetting.dto';

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

  async getAllProducts(filtersDTO: FiltersDTO): Promise<GetAllProductsRepositoryType> {
    const {page, itemsPerPage, minPrice, maxPrice, minRating, maxRating, category, brands, sortBy, order} = filtersDTO;
    const allPossibleCategoryValues = getNumericEnumValues(Category);
    const allPossibleBrandValues = getNumericEnumValues(Brand);
    const brandsArray = brands
      ?.split(',')
      .map((brand) => Number(brand))
      .filter((item) => item !== 0);
    const filters = {
      price: {
        $gte: minPrice || 0,
        $lte: maxPrice || Infinity
      },
      _rating: {
        $gte: minRating || 0,
        $lte: maxRating || Infinity
      },
      category: category || allPossibleCategoryValues,
      'producer.name': brandsArray?.length ? brandsArray : allPossibleBrandValues
    };
    const sortByKey = getLabelByValue(sortByOptions, sortBy);
    const products = await this.productModel
      .find(filters)
      .sort({[sortByKey]: order})
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .exec();
    const itemsCount = await this.productModel.countDocuments(filters);

    return {products, itemsCount};
  }

  async getProductsStats(filtersDTO: FiltersForStatsGettingDTO): Promise<ProductsStatsDTO> {
    const {minPrice: minPriceConstraint, maxPrice: maxPriceConstraint, minRating, maxRating, brands} = filtersDTO;
    const allPossibleBrandValues = getNumericEnumValues(Brand);
    const brandsArray = brands
      ?.split(',')
      .map((brand) => Number(brand))
      .filter((item) => item !== 0);
    const categories = getNumericEnumValues(Category);
    const quantityByCategoryArr = categories.map((category) => ({category: category, items: `$category${category}`}));
    const statsPipeline = [
      {
        $match: {
          price: {
            $gte: minPriceConstraint || 0,
            $lte: maxPriceConstraint || Infinity
          },
          _rating: {
            $gte: minRating || 0,
            $lte: maxRating || Infinity
          },
          'producer.name': {
            $in: brandsArray?.length ? brandsArray : allPossibleBrandValues
          }
        }
      },
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
      statsPipeline[1].$group[`category${category}`] = {
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

    const productWithSameTitle = await this.productModel.findOne({title: productDTO.title, _id: {$ne: productID}});
    if (productWithSameTitle) {
      throw new HttpException(productErrorMessages.ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return await this.productModel.findByIdAndUpdate(productID, {...productDTO, price: productDTO.price.toFixed(2)}, {new: true});
  }
}
