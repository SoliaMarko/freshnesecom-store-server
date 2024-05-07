import {ApiProperty} from '@nestjs/swagger';
import {ArrayMaxSize, ArrayMinSize, ArrayUnique, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Max, Min} from 'class-validator';
import {AdditionalDescription} from '../models/additionalDescription.model';
import {Producer} from '../models/producer.model';
import {EachHas} from '@validators/class-validator-exteders/eachHas/eachHas';
import {HasValid} from '@validators/class-validator-exteders/hasValid/hasValid';
import {HasValidLength} from '@validators/class-validator-exteders/hasValidLength/hasValidLength';
import {StartsWith} from '@validators/class-validator-exteders/startsWith/startsWith';
import {
  additionalDescriptionsValidationRules,
  categoryValidationRules,
  colorsValidationRules,
  countryCodeValidationRules,
  deliveryLocationValidationRules,
  discountValidationRules,
  freshnessValidationRules,
  imagesValidationRules,
  inStockCountValidationRules,
  mainDescriptionValidationRules,
  priceValidationRules,
  producerValidationRules,
  quantityUnitsValidationRules,
  sizesValidationRules,
  subCategoryValidationRules,
  titleValidationRules
} from '@constants/validationRules/productValidationRules';
import {productSwaggerSchema} from '@constants/swaggerConstants/products/productSwaggerSchema.constant';

export class CreateProductDTO {
  @IsNotEmpty()
  @Length(titleValidationRules.MIN_LENGTH, titleValidationRules.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.TITLE_SCHEMA)
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(categoryValidationRules.ENUM)
  @ApiProperty(productSwaggerSchema.CATEGORY_SCHEMA)
  readonly category: number;

  @IsNotEmpty()
  @IsEnum(subCategoryValidationRules.ENUM)
  @StartsWith({property: 'category'})
  @ApiProperty(productSwaggerSchema.SUBCATEGORY_SCHEMA)
  readonly subCategory: number;

  @IsNotEmpty()
  @ArrayMinSize(imagesValidationRules.MIN_COUNT)
  @ArrayMaxSize(imagesValidationRules.MAX_COUNT)
  @ArrayUnique()
  @ApiProperty(productSwaggerSchema.IMAGES_SCHEMA)
  readonly images: string[];

  @IsNotEmpty()
  @Min(priceValidationRules.MIN_PRICE)
  @ApiProperty(productSwaggerSchema.PRICE_SCHEMA)
  readonly price: number;

  @IsNotEmpty()
  @Length(mainDescriptionValidationRules.MIN_LENGTH, mainDescriptionValidationRules.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.MAIN_DESCRIPTION_SCHEMA)
  readonly mainDescription: string;

  @IsOptional()
  @EachHas({property: 'content'})
  @HasValidLength({
    property: 'title',
    min: additionalDescriptionsValidationRules.title.MIN_LENGTH,
    max: additionalDescriptionsValidationRules.title.MAX_LENGTH,
    each: true,
    optional: true
  })
  @HasValidLength({
    property: 'content',
    min: additionalDescriptionsValidationRules.content.MIN_LENGTH,
    max: additionalDescriptionsValidationRules.content.MAX_LENGTH,
    each: true,
    optional: false
  })
  @ApiProperty(productSwaggerSchema.ADDITIONAL_DESCRIPTIONS_SCHEMA)
  readonly additionalDescriptions?: AdditionalDescription[];

  @IsOptional()
  @Min(discountValidationRules.MIN_DISCOUNT)
  @Max(discountValidationRules.MAX_DISCOUNT)
  @ApiProperty(productSwaggerSchema.DISCOUNT_SCHEMA)
  readonly discount?: number;

  @IsOptional()
  @Length(countryCodeValidationRules.MIN_LENGTH, countryCodeValidationRules.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.COUNTRY_CODE_SCHEMA)
  readonly countryCode?: string;

  @IsOptional()
  @IsInt()
  @Min(inStockCountValidationRules.MIN_COUNT)
  @Max(inStockCountValidationRules.MAX_COUNT)
  @ApiProperty(productSwaggerSchema.IN_STOCK_COUNT_SCHEMA)
  readonly inStockCount?: number;

  @IsOptional()
  @IsEnum(quantityUnitsValidationRules.ENUM, {each: true})
  @ArrayUnique()
  @ApiProperty(productSwaggerSchema.QUANTITY_UNITS_SCHEMA)
  readonly quantityUnits?: string[];

  @IsOptional()
  @IsEnum(freshnessValidationRules.ENUM)
  @ApiProperty(productSwaggerSchema.FRESHNESS_SCHEMA)
  readonly freshness?: number;

  @IsOptional()
  @HasValid({property: 'category', enums: producerValidationRules.category.ENUM})
  @HasValidLength({property: 'name', min: producerValidationRules.name.MIN_LENGTH, max: producerValidationRules.name.MAX_LENGTH, optional: false})
  @ApiProperty(productSwaggerSchema.PRODUCER_SCHEMA)
  readonly producer?: Producer;

  @IsOptional()
  @Length(deliveryLocationValidationRules.MIN_LENGTH, deliveryLocationValidationRules.MAX_LENGTH)
  @ApiProperty(productSwaggerSchema.DELIVERY_FROM_SCHEMA)
  readonly deliveryFrom?: string;

  @IsOptional()
  @ArrayUnique()
  @Length(deliveryLocationValidationRules.MIN_LENGTH, deliveryLocationValidationRules.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.DELIVERY_AREA_SCHEMA)
  readonly deliveryArea?: string[];

  @IsOptional()
  @ArrayUnique()
  @Length(sizesValidationRules.MIN_LENGTH, sizesValidationRules.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.SIZES_SCHEMA)
  readonly sizes?: string[];

  @IsOptional()
  @ArrayUnique()
  @Length(colorsValidationRules.MIN_LENGTH, colorsValidationRules.MAX_LENGTH, {each: true})
  @ApiProperty(productSwaggerSchema.COLORS_SCHEMA)
  readonly colors?: string[];
}
