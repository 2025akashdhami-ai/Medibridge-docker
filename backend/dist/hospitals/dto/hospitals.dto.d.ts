export declare class UpdateResourcesDto {
    beds_available?: number;
    total_beds?: number;
    ambulances_available?: number;
    total_ambulances?: number;
    oxygen_cylinders?: number;
    location?: {
        address?: string;
        latitude?: number;
        longitude?: number;
        phone?: string;
    };
}
