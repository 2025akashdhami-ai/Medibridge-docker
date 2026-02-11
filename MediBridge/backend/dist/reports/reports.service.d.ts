import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schemas/report.schema';
export declare class ReportsService {
    private reportModel;
    constructor(reportModel: Model<ReportDocument>);
    create(reportData: Partial<Report>): Promise<import("mongoose").Document<unknown, {}, ReportDocument, {}, {}> & Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, ReportDocument, {}, {}> & Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ReportDocument, {}, {}> & Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, ReportDocument, {}, {}> & Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
