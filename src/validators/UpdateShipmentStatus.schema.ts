import { z } from "zod";


const orderTrackings = z.object({
  order_id: z.number().default(0),
  is_active: z.boolean().default(true),
})

export const updateShipmentStatusSchema = z.object({

  order_id: z.number(),
  shipment_status_id: z.number().optional(),
  comment: z.string().min(1, "Comment is required"),
  pod: z.string().optional(),
  order_trackings: orderTrackings.optional(),

})


export type UpdateShipmentStatusSchema = z.infer<typeof updateShipmentStatusSchema>;