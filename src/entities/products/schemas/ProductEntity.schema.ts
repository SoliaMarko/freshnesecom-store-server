import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Freshness} from '@enums/products/freshness.enum';
import {QuantityUnits} from '@enums/products/quantityUnits.enum';
import {AdditionalDescription} from '../models/properties/additionalDescription.model';
import {Producer} from '../models/properties/producer.model';
import {productValidationRules} from '@constants/validationRules/productValidationRules';
import {generateErrorPropNotManuallySettable} from '@constants/errorMessages/productErrorMessages.constant';

@Schema()
export class ProductEntity {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    minlength: productValidationRules.title.MIN_LENGTH,
    maxlength: productValidationRules.title.MAX_LENGTH
  })
  title: string;

  @Prop({required: true, enum: productValidationRules.category.ENUM})
  category: number;

  @Prop({required: true, enum: productValidationRules.subCategory.ENUM})
  subCategory: number;

  @Prop({required: true, minlength: productValidationRules.images.MIN_COUNT, maxlength: productValidationRules.images.MAX_COUNT})
  images: string[];

  @Prop({required: true, min: productValidationRules.price.MIN_PRICE})
  price: number;

  @Prop({
    required: true,
    trim: true,
    minlength: productValidationRules.mainDescription.MIN_LENGTH,
    maxlength: productValidationRules.mainDescription.MAX_LENGTH
  })
  mainDescription: string;

  @Prop({required: true, type: [AdditionalDescription]})
  additionalDescriptions: AdditionalDescription[];

  @Prop({required: false, min: productValidationRules.discount.MIN_DISCOUNT, max: productValidationRules.discount.MAX_DISCOUNT, default: 0})
  discount?: number;

  @Prop({required: false, minlength: productValidationRules.countryCode.MIN_LENGTH, maxlength: productValidationRules.countryCode.MAX_LENGTH})
  countryCode?: string;

  @Prop({required: false, min: productValidationRules.inStockCount.MIN_COUNT, max: productValidationRules.inStockCount.MAX_COUNT, default: 0})
  inStockCount?: number;

  @Prop({required: false, type: [Number], enum: productValidationRules.quantityUnits.ENUM, default: [QuantityUnits.Pcs]})
  quantityUnits?: number[];

  @Prop({required: false, enum: productValidationRules.freshness.ENUM, default: Freshness.New})
  freshness?: number;

  @Prop({required: false})
  producer?: Producer;

  @Prop({
    required: false,
    trim: true,
    minlength: productValidationRules.deliveryLocation.MIN_LENGTH,
    maxlength: productValidationRules.deliveryLocation.MAX_LENGTH
  })
  deliveryFrom?: string;

  @Prop({required: false})
  deliveryArea?: string[];

  @Prop({required: false, default: false})
  freeShipping: boolean;

  @Prop({required: false})
  sizes?: string[];

  @Prop({required: false})
  colors?: string[];

  @Prop({required: false, min: productValidationRules.rating.MIN_VALUE, max: productValidationRules.rating.MAX_VALUE, default: 0})
  _rating?: number;

  get rating() {
    return this._rating;
  }

  set rating(_value) {
    throw new Error(generateErrorPropNotManuallySettable('Rating'));
  }

  @Prop({required: false})
  notes?: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;
}

export const ProductEntitySchema = SchemaFactory.createForClass(ProductEntity);
