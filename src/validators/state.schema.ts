import { z } from "zod";

// form zod validation schema for user registration
export const stateSchema = z.object({
  name: z.string().min(1, " Name is required"),
  state_code: z.string().min(1, " Code is required"),
  is_active: z.boolean().default(true),
  country_id: z.number().default(1)
  
});

// generate form types from zod validation schema
export type StateSchema = z.infer<typeof stateSchema>;
