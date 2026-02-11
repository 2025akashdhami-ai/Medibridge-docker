import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

export class CreateReportDto {
  @IsString()
  symptoms_text: string;

  @IsString()
  predicted_disease: string;

  @IsNumber()
  confidence: number;

  @IsString()
  summary: string;

  @IsArray()
  @IsString({ each: true })
  recommendations: string[];

  @IsEnum(['low', 'moderate', 'high'])
  severity: string;
}


