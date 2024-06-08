import {ApiOperation} from '@nestjs/swagger';

export const ApiProducts = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor): void => {
    ApiOperation({tags: ['products']})(target, key, descriptor);
  };
};
