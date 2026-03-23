import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterHospitalDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(registerDto: RegisterUserDto): Promise<{
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
    registerHospital(registerDto: RegisterHospitalDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
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
    getProfile(req: any): any;
}
