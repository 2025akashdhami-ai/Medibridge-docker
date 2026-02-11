export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    age: number;
}
export declare class RegisterHospitalDto {
    hospital_name: string;
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
    role: 'user' | 'hospital';
}
