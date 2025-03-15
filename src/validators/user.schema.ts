import { z } from "zod";

// form zod validation schema for user registration
export const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  country_id: z.number().default(1),
 
  role_id: z.number().min(1, "Role is required"),  
 company_id: z.number().nullable().default(null),  // company_id can be null
  branch_id: z.number().nullable().default(null),  

  status_id: z.number().min(1, "State ID is required"),

  state_id: z.number().min(1, "State ID is required"),
  city_id: z.number().min(1, "City ID is required"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters"),
  license_no: z.string().nullable().default(null),

  
});

export type UserSchema = z.infer<typeof userSchema>;
