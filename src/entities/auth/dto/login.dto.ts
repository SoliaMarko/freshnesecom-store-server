import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {descriptions} from '@constants/swaggerConstants/userEntitiesDescriptions.constant';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: descriptions.EMAIL_DESCRIPTION, example: 'winstonsmith@mail.com', required: true})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: descriptions.PASSWORD_DESCRIPTION, example: 'bH6)jJ_2', required: true})
  readonly password: string;
}
