import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  symptoms_text: string;

  @Prop({ required: true })
  predicted_disease: string;

  @Prop({ required: true })
  confidence: number;

  @Prop({ required: true })
  summary: string;

  @Prop({ type: [String], default: [] })
  recommendations: string[];

  @Prop({ required: true, enum: ['low', 'moderate', 'high'] })
  severity: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);


