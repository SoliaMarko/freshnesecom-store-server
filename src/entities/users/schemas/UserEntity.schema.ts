import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {hashPassword} from '@utils/bcrypt';
import {NextFunction} from 'interfaces/nextFunction.interface';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true, select: false})
  password: string;

  @Prop({required: false})
  phoneNumber?: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: NextFunction) {
  this.password = await hashPassword(this.password);
  next();
});
