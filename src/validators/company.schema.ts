import { z } from "zod";

// Define the validation schema for company form
export const companySchema = z.object({
  name: z.string().nonempty("Company Name is required"),
  gst_number: z.string().nonempty("GST Number is required"),
  address: z.string().optional(),
  registration_number: z
    .string()
    .nonempty("Registration Number is required"),

  contact_persons: z
    .array(
      z.object({
        name: z.string().nonempty("Contact Name is required"),
        email: z
          .string()
          .email("Invalid email address")
          .nonempty("Contact Email is required"),
        phone_number: z
          .string()
          .nonempty("Contact Phone Number is required"),
      })
    )
    .nonempty("At least one contact person is required"),


  user_limit: z.coerce.number().min(1, { message: 'User Limit is required'}),

  industry_type_id: z.coerce.number().min(1, { message: 'Industry Type is required'}),
  globle_status_id: z.coerce.number().min(1, { message: 'Status is required' }).optional(),

  country_id: z.coerce.number().min(1, { message: 'Industry Type is required'}),
  state_id: z.coerce.number().min(1, { message: 'Industry Type is required'}),
  city_id: z.coerce.number().min(1, { message: 'Industry Type is required'}),




  


  logo: z.string().optional(),
  
});

// Generate TypeScript types from the schema
export type CompanySchema = z.infer<typeof companySchema>;
