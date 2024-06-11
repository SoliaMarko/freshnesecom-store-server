import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {descriptions} from '@constants/swaggerConstants/users/userEntities/userEntitiesDescriptions.constant';
import {examples} from '@constants/swaggerConstants/users/userEntities/userEntitiesExamples.constant';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: descriptions.EMAIL_DESCRIPTION, example: examples.EMAIL_EXAMPLE, required: true})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: descriptions.PASSWORD_DESCRIPTION, example: examples.PASSWORD_EXAMPLE, required: true})
  readonly password: string;
}
