import { z } from "zod";


export const orderTrackingSchema = z.object({
    order_id: z.number(),

    is_active: z.boolean().default(true)
});

export type OrderTrackingSchema = z.infer<typeof orderTrackingSchema>;