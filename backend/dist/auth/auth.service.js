"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../schemas/user.schema");
const hospital_schema_1 = require("../schemas/hospital.schema");
let AuthService = class AuthService {
    constructor(userModel, hospitalModel, jwtService) {
        this.userModel = userModel;
        this.hospitalModel = hospitalModel;
        this.jwtService = jwtService;
    }
    async validateUser(email, password, role) {
        let user;
        if (role === 'user') {
            user = await this.userModel.findOne({ email }).exec();
        }
        else {
            user = await this.hospitalModel.findOne({ email }).exec();
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(user) {
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
    async registerUser(userData) {
        const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
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
    async registerHospital(hospitalData) {
        const existingHospital = await this.hospitalModel.findOne({ email: hospitalData.email }).exec();
        if (existingHospital) {
            throw new common_1.ConflictException('Hospital with this email already exists');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(hospital_schema_1.Hospital.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map