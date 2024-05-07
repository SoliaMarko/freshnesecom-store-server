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
import {getNumericEnumValues} from '@utils/getEnumValues';

const messageGenerators = {
  generateCommon: (field: string, dataType: string) => `Product ${field}. Accept ${dataType}`,

  generateMustHaveLengthInRange: (min: number, max: number, field: string, dataType = 'string'): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must have length between ${min} and ${max} ${dataType.includes('string') ? 'characters' : 'items'} long.`;
  },

  generateMustBeInRange: (min: number, max: number, field: string, dataType = 'number', units = ''): string => {
    return `${messageGenerators.generateCommon(field, dataType)}  which must be between ${min} and ${max}. ${units}`;
  },

  generateMustHaveProps: (props: string[], field: string, dataType = 'object'): string => {
    return `${messageGenerators.generateCommon(field, dataType)}  which must have props: ${props.join(', ')}`;
  },

  generateMustBeNotLess: (min: number, field: string, dataType = 'number'): string => {
    return `${messageGenerators.generateCommon(field, dataType)}   which must be not less than ${min}.`;
  },

  generateMustAcceptValues: (values: string[], field: string, dataType: string): string => {
    return `${messageGenerators.generateCommon(field, dataType)}  with possible values: ${values.join(', ')}.`;
  },

  generateMustBeUnique: () => 'Must be unique.'
};

export const productDescriptions = {
  TITLE_DESCRIPTION:
    messageGenerators.generateMustHaveLengthInRange(titleValidationRules.MIN_LENGTH, titleValidationRules.MAX_LENGTH, 'title', 'string') +
    messageGenerators.generateMustBeUnique(),
  CATEGORY_DESCRIPITON: messageGenerators.generateMustAcceptValues(getNumericEnumValues(categoryValidationRules.ENUM), 'category', 'enum'),
  SUBCATEGORY_DESCRIPITON:
    messageGenerators.generateMustAcceptValues(getNumericEnumValues(subCategoryValidationRules.ENUM), 'subCategory', 'enum') +
    ' Must start with the same value as in chosen category. (f.e: if chosen category is [2], available subcategories are: [21, 22, 23...])',
  IMAGES_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    imagesValidationRules.MIN_COUNT,
    imagesValidationRules.MAX_COUNT,
    'images',
    'array'
  ),
  PRICE_DESCRIPTION: messageGenerators.generateMustBeNotLess(priceValidationRules.MIN_PRICE, 'price', 'number'),
  MAIN_DESCRIPTION_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    mainDescriptionValidationRules.MIN_LENGTH,
    mainDescriptionValidationRules.MAX_LENGTH,
    'main description',
    'string'
  ),
  ADDITIONAL_DESCRIPTIONS_DESCRIPTION:
    messageGenerators.generateMustHaveProps(['title', 'content*'], 'additional description', 'array of objects') +
    ': 1) ' +
    messageGenerators.generateMustHaveLengthInRange(
      additionalDescriptionsValidationRules.title.MIN_LENGTH,
      additionalDescriptionsValidationRules.title.MAX_LENGTH,
      "additional description's title (isn't required)",
      'string'
    ) +
    ': 2) ' +
    messageGenerators.generateMustHaveLengthInRange(
      additionalDescriptionsValidationRules.content.MIN_LENGTH,
      additionalDescriptionsValidationRules.content.MAX_LENGTH,
      "additional description's content (is required)",
      'string'
    ),
  DISCOUNT_DESCRIPTION: messageGenerators.generateMustBeInRange(
    discountValidationRules.MIN_DISCOUNT,
    discountValidationRules.MAX_DISCOUNT,
    'discount',
    'number',
    '(in %)'
  ),
  COUNTRY_CODE_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    countryCodeValidationRules.MIN_LENGTH,
    countryCodeValidationRules.MAX_LENGTH,
    'country code',
    'string'
  ),
  IN_STOCK_COUNT_DESCRIPTION: messageGenerators.generateMustBeInRange(
    inStockCountValidationRules.MIN_COUNT,
    inStockCountValidationRules.MAX_COUNT,
    'in stock count',
    'integer'
  ),
  QUANTITY_UNITS_DESCRIPTION: messageGenerators.generateMustAcceptValues(
    getNumericEnumValues(quantityUnitsValidationRules.ENUM),
    'quantity units',
    'array of enums'
  ),
  FRESHNESS_DESCRIPTION: messageGenerators.generateMustAcceptValues(getNumericEnumValues(freshnessValidationRules.ENUM), 'freshness', 'enum'),
  PRODUCER_DESCRIPTION:
    messageGenerators.generateMustHaveProps(['category*', 'name*'], 'producer', 'object') +
    ': 1) ' +
    messageGenerators.generateMustAcceptValues(
      getNumericEnumValues(producerValidationRules.category.ENUM),
      "producer's category (is required)",
      'enum'
    ) +
    ': 2) ' +
    messageGenerators.generateMustHaveLengthInRange(
      producerValidationRules.name.MIN_LENGTH,
      producerValidationRules.name.MAX_LENGTH,
      "producer's name (is required)",
      'string'
    ),
  DELIVERY_FROM_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    deliveryLocationValidationRules.MIN_LENGTH,
    deliveryLocationValidationRules.MAX_LENGTH,
    'delivery from',
    'string'
  ),
  DELIVERY_AREA_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    deliveryLocationValidationRules.MIN_LENGTH,
    deliveryLocationValidationRules.MAX_LENGTH,
    'delivery area',
    'array of strings'
  ),
  SIZES_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    sizesValidationRules.MIN_LENGTH,
    sizesValidationRules.MAX_LENGTH,
    'sizes',
    'array of strings'
  ),
  COLORS_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    colorsValidationRules.MIN_LENGTH,
    colorsValidationRules.MAX_LENGTH,
    'colors',
    'array of strings'
  )
};
