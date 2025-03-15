import { z } from "zod";

// form zod validation schema for user registration
export const serviceSchema = z.object({
  name: z.string().min(1, " Name is required"),
  description: z.string().optional(),
  is_active: z.boolean().default(true)
  
});

// generate form types from zod validation schema
export type ServiceSchema = z.infer<typeof serviceSchema>;
