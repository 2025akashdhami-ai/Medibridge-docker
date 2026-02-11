import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  age: number;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: [String], default: [] })
  symptoms_history: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);


