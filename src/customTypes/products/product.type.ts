import {HydratedDocument} from 'mongoose';
import {ProductEntity} from '@entities/products/schemas/ProductEntity.schema';

export type ProductDocument = HydratedDocument<ProductEntity>;

export type ProductResponseType = ProductEntity;
