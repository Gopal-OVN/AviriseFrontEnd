import { z } from "zod";


export const rolePermissionSchema = z.object({
    role_ids: z.array(z.number()).min(1, "At least one role must be selected"),
    permission_ids: z.array(z.number()).min(1, "At least one permission must be selected"),
    is_active: z.boolean().default(true)

});

export type RolePermissionSchema = z.infer<typeof rolePermissionSchema>;


export const combinedSchema = z.object({
    role_id: z.number().min(1, "Role is reuired"),
    permission_ids: z.array(z.number()).min(1, "At least one permission must be selected"),
    menu_ids: z.array(z.number()).min(1, "At least one menu must be selected"),
    is_active: z.boolean().default(true),
});

export type CombinedSchema = z.infer<typeof combinedSchema>;



export const updateRolePermissionSchema = z.object({

    role_id: z.number().min(1, "Role is reuired"),
    permission_id: z.number().min(1, "Permission is reuired"),
    is_active: z.boolean().default(true)

});

export type UpdateRolePermissionSchema = z.infer<typeof updateRolePermissionSchema>;