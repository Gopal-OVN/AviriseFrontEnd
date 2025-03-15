import { z } from "zod";


const orderTrackings = z.object({
	order_id: z.number().default(0),
	is_active: z.boolean().default(true),
})

export const driverVehicleSchema = z.object({

	driver_id: z.number(),
	vehicle_id: z.number(),
	appointment_date_time: z.date(),
	order_trackings: orderTrackings.optional(),




});

export type DriverVehicleSchema = z.infer<typeof driverVehicleSchema>;