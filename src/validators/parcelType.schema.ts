import { z } from "zod";

export const parcelSchema = z.object({
    parcel_name : z.string().min(1,"Name is required"),
    description : z.string().optional(),
    is_active: z.boolean().default(true)
});

export  type ParcelSchema = z.infer<typeof parcelSchema>;