export declare class MlServiceService {
    predictDisease(symptoms: string): Promise<{
        disease: string;
        confidence: number;
        summary: string;
        recommendations: string[];
        severity: 'low' | 'moderate' | 'high';
    }>;
}
