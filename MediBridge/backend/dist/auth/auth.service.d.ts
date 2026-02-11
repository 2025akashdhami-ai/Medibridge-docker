import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { HospitalDocument } from '../schemas/hospital.schema';
export declare class AuthService {
    private userModel;
    private hospitalModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, hospitalModel: Model<HospitalDocument>, jwtService: JwtService);
    validateUser(email: string, password: string, role: string): Promise<UserDocument | HospitalDocument>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            age: any;
            hospital_name: any;
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    registerUser(userData: {
        name: string;
        email: string;
        password: string;
        age: number;
    }): Promise<{
        access_token: string;
        user: {
            age: any;
            hospital_name: any;
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    registerHospital(hospitalData: {
        hospital_name: string;
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            age: any;
            hospital_name: any;
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
}
