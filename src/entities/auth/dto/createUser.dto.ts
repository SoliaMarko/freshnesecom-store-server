import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length} from 'class-validator';
import {descriptions} from '@constants/swaggerConstants/users/userEntities/userEntitiesDescriptions.constant';
import {examples} from '@constants/swaggerConstants/users/userEntities/userEntitiesExamples.constant';
import {firstNameValidationRules, lastNameValidationRules} from '@constants/validationRules/validationRules.constant';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(firstNameValidationRules.MIN_LENGTH, firstNameValidationRules.MAX_LENGTH)
  @ApiProperty({description: descriptions.FIRST_NAME_DESCRIPTION, example: examples.FIRST_NAME_EXAMPLE, required: true})
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(lastNameValidationRules.MIN_LENGTH, lastNameValidationRules.MAX_LENGTH)
  @ApiProperty({description: descriptions.LAST_NAME_DESCRIPTION, example: examples.LAST_NAME_EXAMPLE, required: true})
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: descriptions.EMAIL_DESCRIPTION, example: examples.EMAIL_EXAMPLE, required: true})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: descriptions.PASSWORD_DESCRIPTION, example: examples.PASSWORD_EXAMPLE, required: true})
  readonly password: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  @ApiProperty({description: descriptions.PHONE_NUMBER_DESCRIPTION, example: examples.PHONE_NUMBER_EXAMPLE, required: false})
  readonly phoneNumber?: string;
}
