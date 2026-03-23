import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { Hospital, HospitalDocument } from '../schemas/hospital.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, role: string) {
    let user: UserDocument | HospitalDocument | null;
    
    if (role === 'user') {
      user = await this.userModel.findOne({ email }).exec();
    } else {
      user = await this.hospitalModel.findOne({ email }).exec();
    }
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role || (user.hospital_name ? 'hospital' : 'user'),
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name || user.hospital_name,
        email: user.email,
        role: user.role || (user.hospital_name ? 'hospital' : 'user'),
        ...(user.hospital_name && { hospital_name: user.hospital_name }),
        ...(user.age && { age: user.age }),
      },
    };
  }

  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
    age: number;
  }) {
    const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new this.userModel({
      ...userData,
      password: hashedPassword,
      role: 'user',
    });

    await user.save();
    return this.login(user);
  }

  async registerHospital(hospitalData: {
    hospital_name: string;
    email: string;
    password: string;
  }) {
    const existingHospital = await this.hospitalModel.findOne({ email: hospitalData.email }).exec();
    if (existingHospital) {
      throw new ConflictException('Hospital with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(hospitalData.password, 10);
    const hospital = new this.hospitalModel({
      ...hospitalData,
      password: hashedPassword,
      role: 'hospital',
    });

    await hospital.save();
    return this.login(hospital);
  }
}

