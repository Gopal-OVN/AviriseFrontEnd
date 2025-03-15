import { z } from "zod";

// form zod validation schema for user registration
export const citySchema = z.object({
  name: z.string().min(1, " Name is required"),
  is_active: z.boolean().default(true),
  state_id: z.number().optional(),
  
});

// generate form types from zod validation schema
export type CitySchema = z.infer<typeof citySchema>;
