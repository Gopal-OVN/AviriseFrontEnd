import { z } from "zod";

export const orderItemSchema = z.object({
    order_item_id: z.number().optional(),
    total_parcel_weight: z.number().optional(),
    number_of_box: z.number().optional(),
    dimention_type: z.string().optional(),
    total_volume: z.number().optional(),
    parcel_hight: z.number().optional(),
    parcel_width: z.number().optional(),
    parcel_breadth: z.number().optional(),
    volume: z.number().optional(),
    parcel_weight: z.number().optional(),
    is_fragile: z.boolean().optional(),
    is_active: z.boolean().default(true)
})

export type OrderItemSchema = z.infer<typeof orderItemSchema>;