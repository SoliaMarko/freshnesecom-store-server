import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {hashPassword} from '@utils/bcrypt';
import {NextFunction} from 'interfaces/nextFunction.interface';
import {Types} from 'mongoose';

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

  @Prop({required: false})
  accessToken?: string;

  @Prop({required: false})
  refreshToken?: string;

  @Prop({required: false})
  wishlist?: Types.ObjectId[];
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: NextFunction) {
  this.password = await hashPassword(this.password);
  next();
});
