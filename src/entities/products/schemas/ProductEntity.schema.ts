import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Freshness} from '@enums/products/freshness.enum';
import {QuantityUnits} from '@enums/products/quantityUnits.enum';
import {AdditionalDescription} from '../models/additionalDescription.model';
import {Producer} from '../models/producer.model';
import {
  categoryValidationRules,
  countryCodeValidationRules,
  deliveryLocationValidationRules,
  discountValidationRules,
  freshnessValidationRules,
  imagesValidationRules,
  inStockCountValidationRules,
  mainDescriptionValidationRules,
  priceValidationRules,
  quantityUnitsValidationRules,
  ratingValidationRules,
  subCategoryValidationRules,
  titleValidationRules
} from '@constants/validationRules/productValidationRules';

@Schema()
export class ProductEntity {
  @Prop({required: true, unique: true, trim: true, minlength: titleValidationRules.MIN_LENGTH, maxlength: titleValidationRules.MAX_LENGTH})
  title: string;

  @Prop({required: true, enum: categoryValidationRules.ENUM})
  category: number;

  @Prop({required: true, enum: subCategoryValidationRules.ENUM})
  subCategory: number;

  @Prop({required: true, minlength: imagesValidationRules.MIN_COUNT, maxlength: imagesValidationRules.MAX_COUNT})
  images: string[];

  @Prop({required: true, min: priceValidationRules.MIN_PRICE})
  price: number;

  @Prop({required: true, trim: true, minlength: mainDescriptionValidationRules.MIN_LENGTH, maxlength: mainDescriptionValidationRules.MAX_LENGTH})
  mainDescription: string;

  @Prop({required: true, type: [AdditionalDescription]})
  additionalDescriptions: AdditionalDescription[];

  @Prop({required: false, min: discountValidationRules.MIN_DISCOUNT, max: discountValidationRules.MAX_DISCOUNT, default: 0})
  discount?: number;

  @Prop({required: false, minlength: countryCodeValidationRules.MIN_LENGTH, maxlength: countryCodeValidationRules.MAX_LENGTH})
  countryCode?: string;

  @Prop({required: false, min: inStockCountValidationRules.MIN_COUNT, max: inStockCountValidationRules.MAX_COUNT, default: 0})
  inStockCount?: number;

  @Prop({required: false, type: [Number], enum: quantityUnitsValidationRules.ENUM, default: [QuantityUnits.Pcs]})
  quantityUnits?: number[];

  @Prop({required: false, enum: freshnessValidationRules.ENUM, default: Freshness.New})
  freshness?: number;

  @Prop({required: false})
  producer?: Producer;

  @Prop({required: false, trim: true, minlength: deliveryLocationValidationRules.MIN_LENGTH, maxlength: deliveryLocationValidationRules.MAX_LENGTH})
  deliveryFrom?: string;

  @Prop({required: false})
  deliveryArea?: string[];

  @Prop({required: false})
  sizes?: string[];

  @Prop({required: false})
  colors?: string[];

  @Prop({required: false, min: ratingValidationRules.MIN_VALUE, max: ratingValidationRules.MAX_VALUE, default: 0})
  _rating?: number;

  get rating() {
    return this._rating;
  }

  set rating(_value) {
    throw new Error('Rating cannot be set manually');
  }
}

export const ProductEntitySchema = SchemaFactory.createForClass(ProductEntity);
