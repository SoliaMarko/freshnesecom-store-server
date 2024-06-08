import {ApiOperation} from '@nestjs/swagger';

export const ApiUser = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor): void => {
    ApiOperation({tags: ['user']})(target, key, descriptor);
  };
};
