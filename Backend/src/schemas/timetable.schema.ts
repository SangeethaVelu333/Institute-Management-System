import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TimetableDocument = Timetable & Document;

@Schema()
export class Timetable {

  @Prop()

  @Prop({ required: true })
  staff_name: string;

  @Prop({ required: true })
  subject_name: string;

  @Prop({ required: true})
  batch: string;

  
  @Prop({default: Date.now})
  date: Date;

}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);