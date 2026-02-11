import { HospitalsService } from './hospitals.service';
import { UpdateResourcesDto } from './dto/hospitals.dto';
export declare class HospitalsController {
    private hospitalsService;
    constructor(hospitalsService: HospitalsService);
    getAllHospitals(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/hospital.schema").HospitalDocument, {}, {}> & import("../schemas/hospital.schema").Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getHospital(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/hospital.schema").HospitalDocument, {}, {}> & import("../schemas/hospital.schema").Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateResources(req: any, updateDto: UpdateResourcesDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/hospital.schema").HospitalDocument, {}, {}> & import("../schemas/hospital.schema").Hospital & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
