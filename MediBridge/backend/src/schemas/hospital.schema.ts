import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema({ timestamps: true })
export class Hospital {
  @Prop({ required: true })
  hospital_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'hospital' })
  role: string;

  @Prop({ default: 0 })
  beds_available: number;

  @Prop({ default: 0 })
  total_beds: number;

  @Prop({ default: 0 })
  ambulances_available: number;

  @Prop({ default: 0 })
  total_ambulances: number;

  @Prop({ default: 0 })
  oxygen_cylinders: number;

  @Prop({ type: Object })
  location: {
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  };
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);


