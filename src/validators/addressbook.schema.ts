import { z } from "zod";

// form zod validation schema for user registration
export const addressbookSchema = z.object({

  company_name: z.string().optional(), //min(1, " Name is required"),
  contact_name: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  // name: z.string().default(""),
  email: z.string().optional(),


  //   state_code: z.string().optional(),
  is_active: z.boolean().default(true),
  country_id: z.number().default(1),
  // customer_id: z.number().default(1),

  state_id: z.number().optional(),
  city_id: z.number().optional(),
  // customer_id: z.number().optional(),
  pincode: z.string().optional(),
  is_manual_generate: z.boolean().default(false),



});

// generate form types from zod validation schema
export type AddressbookSchema = z.infer<typeof addressbookSchema>;
