import { Document, Types } from 'mongoose';
export type ReportDocument = Report & Document;
export declare class Report {
    user_id: Types.ObjectId;
    symptoms_text: string;
    predicted_disease: string;
    confidence: number;
    summary: string;
    recommendations: string[];
    severity: string;
}
export declare const ReportSchema: import("mongoose").Schema<Report, import("mongoose").Model<Report, any, any, any, Document<unknown, any, Report, any, {}> & Report & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Report, Document<unknown, {}, import("mongoose").FlatRecord<Report>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Report> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
