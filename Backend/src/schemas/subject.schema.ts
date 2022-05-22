import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {

  @Prop()
  _id: string;

  @Prop({ required: true })
  subject_name: string;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);