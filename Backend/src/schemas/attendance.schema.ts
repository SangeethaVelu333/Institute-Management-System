import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {

  @Prop()
  isPresent: boolean;

  @Prop({default: Date.now})
  date: Date;

}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);