import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from '../schemas/hospital.schema';
export declare class HospitalsService {
    private hospitalModel;
    constructor(hospitalModel: Model<HospitalDocument>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, HospitalDocument, {}, {}> & Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, HospitalDocument, {}, {}> & Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateResources(id: string, resources: Partial<Hospital>): Promise<import("mongoose").Document<unknown, {}, HospitalDocument, {}, {}> & Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, HospitalDocument, {}, {}> & Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
