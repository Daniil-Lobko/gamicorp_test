import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";
import { Optional } from "@nestjs/common";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Optional()
  _id: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
