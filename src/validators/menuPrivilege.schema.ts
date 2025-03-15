import { z } from "zod";


export const menuPrivilegeSchema = z.object({
  role_ids: z.array(z.number()).min(1, "At least one role must be selected"),
  menu_ids: z.array(z.number()).min(1, "At least one menu must be selected"),


});

export type MenuPrivilegeSchema = z.infer<typeof menuPrivilegeSchema>;
