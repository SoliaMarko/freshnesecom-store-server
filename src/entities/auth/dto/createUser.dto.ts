import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length} from 'class-validator';
import {descriptions} from '@constants/swaggerConstants/userEntitiesDescriptions.constant';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @ApiProperty({description: descriptions.FIRST_NAME_DESCRIPTION, example: 'Winston', required: true})
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @ApiProperty({description: descriptions.LAST_NAME_DESCRIPTION, example: 'Smith', required: true})
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: descriptions.EMAIL_DESCRIPTION, example: 'winstonsmith@mail.com', required: true})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: descriptions.PASSWORD_DESCRIPTION, example: 'bH6)jJ_2', required: true})
  readonly password: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  @ApiProperty({description: descriptions.PHONE_NUMBER_DESCRIPTION, example: '+380994321510', required: false})
  readonly phoneNumber?: string;
}