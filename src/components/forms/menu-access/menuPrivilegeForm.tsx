"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import {
    createMenuPrivilegeAPI,
    updateMenuPrivilegeAPI,
} from "../../../services/menu-privilege-service";
import RoleForm from "./roleForm";
import MenuForm from "./menuForm";
import { menuPrivilegeSchema } from "../../../validators/menuPrivilege.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface OrderProps {
    data?: any;
    type?: "Create" | "Edit" | "View";
}

export default function MenuPrivilegeForm({
    data,
    type = "Create",
}: OrderProps) {
    const navigate = useNavigate();
    const methods = useForm<any>({
        resolver: zodResolver(menuPrivilegeSchema),
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit: SubmitHandler<any> = async (formData) => {
        console.log("Submitted data: ", formData);
        try {
            const result = await (type === "Create"
                ? createMenuPrivilegeAPI(formData)
                : updateMenuPrivilegeAPI(data?.id, formData));

            toast.success(result.message || "Operation successful");
            navigate("/menu-privilege");
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
                        <RoleForm />
                        <MenuForm />
                        <div className="d-flex  justify-content-end  gap-2">
                            <button
                                type="button"
                                onClick={() => navigate("#")}
                                className="btn btn-can"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {type === "Create"
                                    ? "Create Menu Access"
                                    : "Update Menu Access"}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
