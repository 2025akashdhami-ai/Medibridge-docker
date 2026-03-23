import { IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateResourcesDto {
  @IsOptional()
  @IsNumber()
  beds_available?: number;

  @IsOptional()
  @IsNumber()
  total_beds?: number;

  @IsOptional()
  @IsNumber()
  ambulances_available?: number;

  @IsOptional()
  @IsNumber()
  total_ambulances?: number;

  @IsOptional()
  @IsNumber()
  oxygen_cylinders?: number;

  @IsOptional()
  @IsObject()
  location?: {
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  };
}


