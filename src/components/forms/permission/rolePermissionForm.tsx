"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRolePermissionAPI,
  updateRolePermissionAPI,
} from "../../../services/role-permission-service";
import PermissionForm from "./permissionForm";
import {
  CombinedSchema,
  combinedSchema,
} from "../../../validators/rolePermission.schema";
import MenuForm from "../menu-access/menuForm";
import RoleOptions from "../../utils/dropdowns/RoleOptions";
import {
  createMenuPrivilegeAPI,
  updateMenuPrivilegeAPI,
} from "../../../services/menu-privilege-service";

interface OrderProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function RolePermissionForm({
  data,
  type = "Create",
}: OrderProps) {
  const navigate = useNavigate();
  const methods = useForm<any>({
    resolver: zodResolver(combinedSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CombinedSchema> = async (formData) => {
    try {
      if (type === "Create") {
        // Call both APIs in parallel
        await Promise.all([
          createRolePermissionAPI({
            role_ids: [formData.role_id],
            permission_ids: formData.permission_ids,
            is_active: formData.is_active,
          }),
          createMenuPrivilegeAPI({
            role_ids: [formData.role_id],
            menu_ids: formData.menu_ids,
            is_active: formData.is_active,
          }),
        ]);
      } else {
        // Call update APIs
        await Promise.all([
          updateRolePermissionAPI(data?.role_id, {
            role_ids: [formData.role_id],
            permission_ids: formData.permission_ids,
            is_active: formData.is_active,
          }),
          updateMenuPrivilegeAPI(data?.role_id, {
            role_ids: [formData.role_id],
            menu_ids: formData.menu_ids,
            is_active: formData.is_active,
          }),
        ]);
      }
      toast.success("Operation successful");
      navigate("/role-permission");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="panel">
      <div className="panel-body product-title-input">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-6"
          >
            <div className="p-4 ">
              <RoleOptions
                setStatus={(e: any) =>
                  setValue("role_id", e.value ?? undefined, {
                    shouldValidate: true,
                  })
                }
                data={data}
                type={type}
                {...(type === "Edit" && { disable: true })}
                error={
                  errors?.role_id ? String(errors.role_id.message) : undefined
                }

              />
            </div>

            <PermissionForm data={data} />
            <MenuForm data={data} />
            <div className="d-flex  justify-content-end  gap-2">
              <button
                type="button"
                onClick={() => navigate("/role-permission")}
                className="btn btn-can"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {type === "Create" ? "Create Permission" : "Update  Permission"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
