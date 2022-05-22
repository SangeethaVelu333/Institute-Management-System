import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;

@Schema()
export class Student {

  @Prop()
  _id: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true})
  batch: string;

  
  @Prop({default: Date.now})
  date: Date;

}

export const StudentSchema = SchemaFactory.createForClass(Student);