import { z } from "zod";


export const shipmentStatusSchema = z.object({
    shipment_status_name: z.string().min(1, "name is required"),
    description: z.string().optional(),
    is_active: z.boolean().default(true)
});

export type ShipmentStatusSchema = z.infer<typeof shipmentStatusSchema>;