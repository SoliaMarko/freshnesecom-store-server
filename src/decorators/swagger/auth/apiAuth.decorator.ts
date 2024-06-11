import {ApiOperation} from '@nestjs/swagger';

export const ApiAuth = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor): void => {
    ApiOperation({tags: ['auth']})(target, key, descriptor);
  };
};
