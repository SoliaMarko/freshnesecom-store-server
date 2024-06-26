import {productValidationRules} from '@constants/validationRules/productValidationRules';
import {getNumericEnumValues} from '@utils/enumTransformators/getNumericEnumValues';
import {messageGenerators} from '@utils/swagger/messageGenerators';

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
    ': ' +
    [
      messageGenerators.generateMustHaveLengthInRange(
        productValidationRules.additionalDescription.title.MIN_LENGTH,
        productValidationRules.additionalDescription.title.MAX_LENGTH,
        "additional description's title (isn't required)",
        'string'
      ),
      messageGenerators.generateMustHaveLengthInRange(
        productValidationRules.additionalDescription.content.MIN_LENGTH,
        productValidationRules.additionalDescription.content.MAX_LENGTH,
        "additional description's content (is required)",
        'string'
      )
    ]
      .map((message, index) => `${++index}) ${message}`)
      .join(' '),
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
    ': ' +
    [
      messageGenerators.generateMustAcceptValues(
        getNumericEnumValues(productValidationRules.producer.category.ENUM),
        "producer's category (is required)",
        'enum'
      ),
      messageGenerators.generateMustAcceptValues(
        getNumericEnumValues(productValidationRules.producer.name.ENUM),
        "producer's name (is required)",
        'enum'
      )
    ]
      .map((message, index) => `${++index}) ${message}`)
      .join(' '),
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
  FREE_SHIPPING_DESCRIPTION: messageGenerators.generateCommon('free shipping', 'boolean'),
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
  ),
  NOTES_DESCRIPTION: messageGenerators.generateMustHaveLengthInRange(
    productValidationRules.notes.MIN_LENGTH,
    productValidationRules.notes.MAX_LENGTH,
    'notes',
    'string'
  )
};
