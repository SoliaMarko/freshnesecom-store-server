import {productValidationRules} from '@constants/validationRules/productValidationRules';
import {getNumericEnumValues} from '@utils/getEnumValues';

const messageGenerators = {
  generateCommon: (field: string, dataType: string) => `Product ${field}. Accept ${dataType}`,

  generateMustHaveLengthInRange: (min: number, max: number, field: string, dataType = 'string'): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must have length between ${min} and ${max} ${dataType.includes('string') ? 'characters' : 'items'} long.`;
  },

  generateMustBeInRange: (min: number, max: number, field: string, dataType = 'number', units = ''): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must be between ${min} and ${max}. ${units}`;
  },

  generateMustHaveProps: (props: string[], field: string, dataType = 'object'): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must have props: ${props.join(', ')}`;
  },

  generateMustBeNotLess: (min: number, field: string, dataType = 'number', units = ''): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must be not less than ${min}. ${units}`;
  },

  generateMustAcceptValues: (values: string[], field: string, dataType: string): string => {
    return `${messageGenerators.generateCommon(field, dataType)}  with possible values: ${values.join(', ')}.`;
  },

  generateMustBeUnique: () => `Must be unique.`
};

export const productDescriptions = {
  TITLE_DESCRIPTION:
    messageGenerators.generateMustHaveLengthInRange(
      productValidationRules.title.MIN_LENGTH,
      productValidationRules.title.MAX_LENGTH,
      'title',
      'string'
    ) + messageGenerators.generateMustBeUnique(),
  CATEGORY_DESCRIPITON: messageGenerators.generateMustAcceptValues(getNumericEnumValues(productValidationRules.category.ENUM), 'category', 'enum'),
  SUBCATEGORY_DESCRIPITON:
    messageGenerators.generateMustAcceptValues(getNumericEnumValues(productValidationRules.subCategory.ENUM), 'subCategory', 'enum') +
    ' Must start with the same value as in chosen category. (f.e: if chosen category is [2], available subcategories are: [21, 22, 23...])',
  IMAGES_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.images.MIN_COUNT,
    productValidationRules.images.MAX_COUNT,
    'images',
    'array'
  ),
  PRICE_DESCRIPTION: messageGenerators.generateMustBeNotLess(productValidationRules.price.MIN_PRICE, 'price', 'number', 'USD'),
  MAIN_DESCRIPTION_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.mainDescription.MIN_LENGTH,
    productValidationRules.mainDescription.MAX_LENGTH,
    'main description',
    'string'
  ),
  ADDITIONAL_DESCRIPTIONS_DESCRIPTION:
    messageGenerators.generateMustHaveProps(['title', 'content*'], 'additional description', 'array of objects') +
    ': 1) ' +
    messageGenerators.generateMustHaveLengthInRange(
      productValidationRules.additionalDescription.title.MIN_LENGTH,
      productValidationRules.additionalDescription.title.MAX_LENGTH,
      "additional description's title (isn't required)",
      'string'
    ) +
    ': 2) ' +
    messageGenerators.generateMustHaveLengthInRange(
      productValidationRules.additionalDescription.content.MIN_LENGTH,
      productValidationRules.additionalDescription.content.MAX_LENGTH,
      "additional description's content (is required)",
      'string'
    ),
  DISCOUNT_DESCRIPTION: messageGenerators.generateMustBeInRange(
    productValidationRules.discount.MIN_DISCOUNT,
    productValidationRules.discount.MAX_DISCOUNT,
    'discount',
    'number',
    '(in %)'
  ),
  COUNTRY_CODE_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.countryCode.MIN_LENGTH,
    productValidationRules.countryCode.MAX_LENGTH,
    'country code',
    'string'
  ),
  IN_STOCK_COUNT_DESCRIPTION: messageGenerators.generateMustBeInRange(
    productValidationRules.inStockCount.MIN_COUNT,
    productValidationRules.inStockCount.MAX_COUNT,
    'in stock count',
    'integer'
  ),
  QUANTITY_UNITS_DESCRIPTION: messageGenerators.generateMustAcceptValues(
    getNumericEnumValues(productValidationRules.quantityUnits.ENUM),
    'quantity units',
    'array of enums'
  ),
  FRESHNESS_DESCRIPTION: messageGenerators.generateMustAcceptValues(getNumericEnumValues(productValidationRules.freshness.ENUM), 'freshness', 'enum'),
  PRODUCER_DESCRIPTION:
    messageGenerators.generateMustHaveProps(['category*', 'name*'], 'producer', 'object') +
    ': 1) ' +
    messageGenerators.generateMustAcceptValues(
      getNumericEnumValues(productValidationRules.producer.category.ENUM),
      "producer's category (is required)",
      'enum'
    ) +
    ': 2) ' +
    messageGenerators.generateMustHaveLengthInRange(
      productValidationRules.producer.name.MIN_LENGTH,
      productValidationRules.producer.name.MAX_LENGTH,
      "producer's name (is required)",
      'string'
    ),
  DELIVERY_FROM_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.deliveryLocation.MIN_LENGTH,
    productValidationRules.deliveryLocation.MAX_LENGTH,
    'delivery from',
    'string'
  ),
  DELIVERY_AREA_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.deliveryLocation.MIN_LENGTH,
    productValidationRules.deliveryLocation.MAX_LENGTH,
    'delivery area',
    'array of strings'
  ),
  SIZES_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.sizes.MIN_LENGTH,
    productValidationRules.sizes.MAX_LENGTH,
    'sizes',
    'array of strings'
  ),
  COLORS_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.colors.MIN_LENGTH,
    productValidationRules.colors.MAX_LENGTH,
    'colors',
    'array of strings'
  )
};
