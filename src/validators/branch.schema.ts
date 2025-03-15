import { z } from 'zod';

// form zod validation schema for user registration
export const branchSchema = z.object({
    name: z.string().min(1, "Company name is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  company_id: z.number().int().min(1, "Company ID is required"),
  created_by: z.number().optional(),
  updated_by: z.number().optional(),
});

// generate form types from zod validation schema
export type BranchSchema = z.infer<typeof branchSchema>;
