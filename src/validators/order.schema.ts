
import { z } from "zod";

const addressSchema = z.object({
  company_name: z.string().min(1, "Company Name is required"),
  contact_name: z.string().min(1, "Contact Name is required"),
  phone_number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  email: z.string().email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
  state_id: z.number({ required_error: "State is required" }),
  city_id: z.number({ required_error: "City is required" }),
  is_manual_generate: z.boolean().default(false),
})

const orderTracking = z.object({
  order_id: z.number().default(0),
  is_active: z.boolean().default(true),
})


export const orderSchema = z.object({
  docket_no: z.number().default(0),
  is_docket_auto: z.boolean().default(true),
  manual_docket: z.string().optional(),
  payment_type: z.string().default("CLIENT_PAYMENT"), // Adjust if there are more payment types
  cod_amount: z.number().default(0),
  service_type_id: z.number(),
  payment_mode_id: z.number(),
  customer_id: z.number(),
  gst_number: z.number().default(0),
  shipment_value: z.number().default(0),
  e_way_bill: z.number().default(0),

  shipment_status_id: z.number().default(0).optional(),


  is_active: z.boolean().default(true),
  parcel_type_id: z.number(),
  is_fragile: z.boolean().default(false),
  parcel_weight: z.number().default(0),
  order_items: z.array(
    z.object({
      number_of_box: z.number().default(0),
      parcel_hight: z.number().default(0),
      parcel_width: z.number().default(0),
      parcel_breadth: z.number().default(0),
      volume: z.number().default(0),
      is_active: z.boolean().default(true),
      order_id: z.number().default(0),
      order_item_id: z.number().default(0),



    })),
  dimension_type: z.string().default("CM"),
  total_volume: z.number().default(0),
  total_box_size: z.number(),
  total_no_of_box: z.number().default(1),


  invoice_no: z.number().default(22),
  forwarding: z.number().default(22),
  booking_instruction: z.string().default("default data"),

  receiver_address_book_id: z.number().optional(),
  sender_address_book_id: z.number().optional(),

  sender_address: addressSchema,
  receiver_address: addressSchema,
  order_trackings: orderTracking.optional(),




})






export type OrderSchema = z.infer<typeof orderSchema>;

