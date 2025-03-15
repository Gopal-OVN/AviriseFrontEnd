import { z } from "zod";

export const vehicleSchema = z.object({
    name: z.string().min(1, "Name is required"),
    vehicle_number: z.string().min(1, "Vehicle Number is required"),
    insurance_validity: z.string().min(1, "Insurance Validity is required"),
    rc_validity: z.string().min(1, "Registration Certificate Validity is required"),
    vehicle_type: z.string().min(1, "Vehical Type is required"),
    // driver_id: z.number().optional(),
    // driver_name: z.string().min(1, "Driver Name is required"),
    is_active: z.boolean().default(true)
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;