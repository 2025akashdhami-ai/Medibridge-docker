import { IsEmail, IsString, MinLength, IsNumber, IsEnum } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  age: number;
}

export class RegisterHospitalDto {
  @IsString()
  hospital_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['user', 'hospital'])
  role: 'user' | 'hospital';
}


