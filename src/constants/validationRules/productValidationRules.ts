import {Brand} from '@enums/products/brands.enum';
import {Category} from '@enums/products/categories.enum';
import {Freshness} from '@enums/products/freshness.enum';
import {ProducerCategory} from '@enums/products/producerCategories.enum';
import {QuantityUnits} from '@enums/products/quantityUnits.enum';
import {SubCategory} from '@enums/products/subCategories.enum';

export const productValidationRules = {
  title: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 120
  },
  category: {
    ENUM: Category
  },
  subCategory: {
    ENUM: SubCategory
  },
  images: {
    MIN_COUNT: 1,
    MAX_COUNT: 5
  },
  price: {
    MIN_PRICE: 0.01
  },
  mainDescription: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 500
  },
  additionalDescription: {
    title: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 48
    },
    content: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 500
    }
  },
  discount: {
    MIN_DISCOUNT: 0,
    MAX_DISCOUNT: 99.99
  },
  countryCode: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 6
  },
  inStockCount: {
    MIN_COUNT: 0,
    MAX_COUNT: 100_000
  },
  quantityUnits: {
    ENUM: QuantityUnits
  },
  freshness: {
    ENUM: Freshness
  },
  producer: {
    category: {
      ENUM: ProducerCategory
    },
    name: {
      ENUM: Brand
    }
  },
  deliveryLocation: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  sizes: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 32
  },
  colors: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 36
  },
  rating: {
    MIN_VALUE: 0,
    MAX_VALUE: 5
  },
  notes: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 500
  }
};
