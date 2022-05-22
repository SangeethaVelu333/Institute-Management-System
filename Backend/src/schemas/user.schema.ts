 import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  _id: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  country_code: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true})
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop()
  salt: string;

  @Prop({ default: false })
  resetPasswordStatus: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
