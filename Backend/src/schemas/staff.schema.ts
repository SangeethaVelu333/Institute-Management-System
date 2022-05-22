import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {

  @Prop()
  _id: string;

  @Prop({ required: true })
  staff_name: string;

  @Prop({ required: true })
  subject_name: string;

}

export const StaffSchema = SchemaFactory.createForClass(Staff);