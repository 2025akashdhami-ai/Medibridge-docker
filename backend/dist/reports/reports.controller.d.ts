import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/reports.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createReport(req: any, createDto: CreateReportDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/report.schema").ReportDocument, {}, {}> & import("../schemas/report.schema").Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getMyReports(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/report.schema").ReportDocument, {}, {}> & import("../schemas/report.schema").Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllReports(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/report.schema").ReportDocument, {}, {}> & import("../schemas/report.schema").Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getReport(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/report.schema").ReportDocument, {}, {}> & import("../schemas/report.schema").Report & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
