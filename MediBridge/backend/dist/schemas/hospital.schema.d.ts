import { Document } from 'mongoose';
export type HospitalDocument = Hospital & Document;
export declare class Hospital {
    hospital_name: string;
    email: string;
    password: string;
    role: string;
    beds_available: number;
    total_beds: number;
    ambulances_available: number;
    total_ambulances: number;
    oxygen_cylinders: number;
    location: {
        address?: string;
        latitude?: number;
        longitude?: number;
        phone?: string;
    };
}
export declare const HospitalSchema: import("mongoose").Schema<Hospital, import("mongoose").Model<Hospital, any, any, any, Document<unknown, any, Hospital, any, {}> & Hospital & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hospital, Document<unknown, {}, import("mongoose").FlatRecord<Hospital>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Hospital> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
