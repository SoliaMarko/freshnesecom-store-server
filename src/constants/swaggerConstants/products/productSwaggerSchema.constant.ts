import {productDescriptions} from './productDescriptions.constant';
import {productExamples} from './productExampleValues.constant';

export const productSwaggerSchema = {
  TITLE_SCHEMA: {description: productDescriptions.TITLE_DESCRIPTION, example: productExamples.TITLE_EXAMPLE, required: true},
  CATEGORY_SCHEMA: {description: productDescriptions.CATEGORY_DESCRIPITON, example: productExamples.CATEGORY_EXAMPLE, required: true},
  SUBCATEGORY_SCHEMA: {description: productDescriptions.SUBCATEGORY_DESCRIPITON, example: productExamples.SUBCATEGORY_EXAMPLE, required: true},
  IMAGES_SCHEMA: {description: productDescriptions.IMAGES_DESCRIPTION, example: productExamples.IMAGES_EXAMPLE, required: true},
  PRICE_SCHEMA: {description: productDescriptions.PRICE_DESCRIPTION, example: productExamples.PRICE_EXAMPLE, required: true},
  MAIN_DESCRIPTION_SCHEMA: {
    description: productDescriptions.MAIN_DESCRIPTION_DESCRIPTION,
    example: productExamples.MAIN_DESCRIPTION_EXAMPLE,
    required: true
  },
  ADDITIONAL_DESCRIPTIONS_SCHEMA: {
    description: productDescriptions.ADDITIONAL_DESCRIPTIONS_DESCRIPTION,
    example: productExamples.ADDITIONAL_DESCRIPTIONS_EXAMPLE,
    required: false
  },
  DISCOUNT_SCHEMA: {description: productDescriptions.DISCOUNT_DESCRIPTION, example: productExamples.DISCOUNT_EXAMPLE, required: false},
  COUNTRY_CODE_SCHEMA: {description: productDescriptions.COUNTRY_CODE_DESCRIPTION, example: productExamples.COUNTRY_CODE_EXAMPLE, required: false},
  IN_STOCK_COUNT_SCHEMA: {
    description: productDescriptions.IN_STOCK_COUNT_DESCRIPTION,
    example: productExamples.IN_STOCK_COUNT_EXAMPLE,
    required: false
  },
  QUANTITY_UNITS_SCHEMA: {
    description: productDescriptions.QUANTITY_UNITS_DESCRIPTION,
    example: productExamples.QUANTITY_UNITS_EXAMPLE,
    required: false
  },
  FRESHNESS_SCHEMA: {description: productDescriptions.FRESHNESS_DESCRIPTION, example: productExamples.FRESHNESS_EXAMPLE, required: false},
  PRODUCER_SCHEMA: {description: productDescriptions.PRODUCER_DESCRIPTION, example: productExamples.PRODUCER_EXAMPLE, required: false},
  DELIVERY_FROM_SCHEMA: {description: productDescriptions.DELIVERY_FROM_DESCRIPTION, example: productExamples.DELIVERY_FROM_EXAMPLE, required: false},
  DELIVERY_AREA_SCHEMA: {description: productDescriptions.DELIVERY_AREA_DESCRIPTION, example: productExamples.DELIVERY_AREA_EXAMPLE, required: false},
  FREE_SHIPPING_SCHEMA: {description: productDescriptions.FREE_SHIPPING_DESCRIPTION, example: productExamples.FREE_SHIPPING_EXAMPLE, required: false},
  SIZES_SCHEMA: {description: productDescriptions.SIZES_DESCRIPTION, example: productExamples.SIZES_EXAMPLE, required: false},
  COLORS_SCHEMA: {description: productDescriptions.COLORS_DESCRIPTION, example: productExamples.COLORS_EXAMPLE, required: false},
  NOTES_SCHEMS: {description: productDescriptions.NOTES_DESCRIPTION, example: productExamples.NOTES_EXAMPLE, required: false}
};
