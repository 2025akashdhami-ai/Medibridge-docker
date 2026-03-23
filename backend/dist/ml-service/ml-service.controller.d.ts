import { MlServiceService } from './ml-service.service';
export declare class MlServiceController {
    private mlService;
    constructor(mlService: MlServiceService);
    predict(body: {
        symptoms: string;
    }): Promise<{
        disease: string;
        confidence: number;
        summary: string;
        recommendations: string[];
        severity: "low" | "moderate" | "high";
    }>;
}
