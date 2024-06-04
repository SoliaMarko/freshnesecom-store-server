import {ApiProperty} from '@nestjs/swagger';
import {ArrayMaxSize, ArrayMinSize, ArrayUnique, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Max, Min} from 'class-validator';
import {AdditionalDescription} from '../models/additionalDescription.model';
import {Producer} from '../models/producer.model';
import {ValidateEachInArrayHas} from '@validators/class-validator-exteders/validateEachInArrayHas/validateEachInArrayHas';
import {HasValid} from '@validators/class-validator-exteders/hasValid/hasValid';
import {HasValidLength} from '@validators/class-validator-exteders/hasValidLength/hasValidLength';
import {StartsWith} from '@validators/class-validator-exteders/startsWith/startsWith';
import {productValidationRules} from '@constants/validationRules/productValidationRules';
import {productSwaggerSchema} from '@constants/swaggerConstants/products/productSwaggerSchema.constant';

export class ProductDTO {
  @IsNotEmpty()
  @Length(productValidationRules.title.MIN_LENGTH, productValidationRules.title.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.TITLE_SCHEMA)
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(productValidationRules.category.ENUM)
  @ApiProperty(productSwaggerSchema.CATEGORY_SCHEMA)
  readonly category: number;

  @IsNotEmpty()
  @IsEnum(productValidationRules.subCategory.ENUM)
  @StartsWith({property: 'category'})
  @ApiProperty(productSwaggerSchema.SUBCATEGORY_SCHEMA)
  readonly subCategory: number;

  @IsNotEmpty()
  @ArrayMinSize(productValidationRules.images.MIN_COUNT)
  @ArrayMaxSize(productValidationRules.images.MAX_COUNT)
  @ArrayUnique()
  @ApiProperty(productSwaggerSchema.IMAGES_SCHEMA)
  readonly images: string[];

  @IsNotEmpty()
  @Min(productValidationRules.price.MIN_PRICE)
  @ApiProperty(productSwaggerSchema.PRICE_SCHEMA)
  readonly price: number;

  @IsNotEmpty()
  @Length(productValidationRules.mainDescription.MIN_LENGTH, productValidationRules.mainDescription.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.MAIN_DESCRIPTION_SCHEMA)
  readonly mainDescription: string;

  @IsOptional()
  @ValidateEachInArrayHas({property: 'content'})
  @HasValidLength({
    property: 'title',
    min: productValidationRules.additionalDescription.title.MIN_LENGTH,
    max: productValidationRules.additionalDescription.title.MAX_LENGTH,
    each: true,
    optional: true
  })
  @HasValidLength({
    property: 'content',
    min: productValidationRules.additionalDescription.content.MIN_LENGTH,
    max: productValidationRules.additionalDescription.content.MAX_LENGTH,
    each: true,
    optional: false
  })
  @ApiProperty(productSwaggerSchema.ADDITIONAL_DESCRIPTIONS_SCHEMA)
  readonly additionalDescriptions?: AdditionalDescription[];

  @IsOptional()
  @Min(productValidationRules.discount.MIN_DISCOUNT)
  @Max(productValidationRules.discount.MAX_DISCOUNT)
  @ApiProperty(productSwaggerSchema.DISCOUNT_SCHEMA)
  readonly discount?: number;

  @IsOptional()
  @Length(productValidationRules.countryCode.MIN_LENGTH, productValidationRules.countryCode.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.COUNTRY_CODE_SCHEMA)
  readonly countryCode?: string;

  @IsOptional()
  @IsInt()
  @Min(productValidationRules.inStockCount.MIN_COUNT)
  @Max(productValidationRules.inStockCount.MAX_COUNT)
  @ApiProperty(productSwaggerSchema.IN_STOCK_COUNT_SCHEMA)
  readonly inStockCount?: number;

  @IsOptional()
  @IsEnum(productValidationRules.quantityUnits.ENUM, {each: true})
  @ArrayUnique()
  @ApiProperty(productSwaggerSchema.QUANTITY_UNITS_SCHEMA)
  readonly quantityUnits?: string[];

  @IsOptional()
  @IsEnum(productValidationRules.freshness.ENUM)
  @ApiProperty(productSwaggerSchema.FRESHNESS_SCHEMA)
  readonly freshness?: number;

  @IsOptional()
  @HasValid({property: 'category', enums: productValidationRules.producer.category.ENUM})
  @HasValid({property: 'name', enums: productValidationRules.producer.name.ENUM})
  @ApiProperty(productSwaggerSchema.PRODUCER_SCHEMA)
  readonly producer?: Producer;

  @IsOptional()
  @Length(productValidationRules.deliveryLocation.MIN_LENGTH, productValidationRules.deliveryLocation.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.DELIVERY_FROM_SCHEMA)
  readonly deliveryFrom?: string;

  @IsOptional()
  @ArrayUnique()
  @Length(productValidationRules.deliveryLocation.MIN_LENGTH, productValidationRules.deliveryLocation.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.DELIVERY_AREA_SCHEMA)
  readonly deliveryArea?: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty(productSwaggerSchema.FREE_SHIPPING_SCHEMA)
  readonly freeShipping?: boolean;

  @IsOptional()
  @ArrayUnique()
  @Length(productValidationRules.sizes.MIN_LENGTH, productValidationRules.sizes.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.SIZES_SCHEMA)
  readonly sizes?: string[];

  @IsOptional()
  @ArrayUnique()
  @Length(productValidationRules.colors.MIN_LENGTH, productValidationRules.colors.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.COLORS_SCHEMA)
  readonly colors?: string[];

  @IsOptional()
  @Length(productValidationRules.notes.MIN_LENGTH, productValidationRules.notes.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.NOTES_SCHEMS)
  readonly notes?: string;
}
