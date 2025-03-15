"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserAPI, updateUserAPI } from "../../../services/user-service";
import { userSchema, UserSchema } from "../../../validators/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Branch from "../../utils/dropdowns/Branch";
import CompanyOptions from "../../utils/dropdowns/CompanyOptions";
import RoleOptions from "../../utils/dropdowns/RoleOptions";
import StatusOptions from "../../utils/dropdowns/StatusOptions";
import CustomAddress from "../company/custom-address";

interface CreateUserFormProps {
  data?: any; // Replace with your user data type
  type?: "Create" | "Edit" | "View";
  link?: any;
  defaultRole?: number;
}

export default function CreateUserForm({
  data,
  type = "Create",
  link,
  defaultRole,
}: CreateUserFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(data?.role_id || ""); // Track selected role
  const navigate = useNavigate();

  const methods = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...data,
      role_id: data?.role_id || defaultRole || "",
      country_id: data?.country_id || 1,
    },
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<UserSchema> = async (formData) => {
    console.log("formData", formData);
    try {
      const result = await (type === "Create"
        ? createUserAPI(formData)
        : updateUserAPI(data?.user_id, formData));

      navigate(link);

      toast.success(result.message || "Operation successful");
    } catch (error) {
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="panel mb-4">
      <div className="panel-body product-title-input">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow flex-col gap-6 p-6"
          >

            {/* <h6 className="mb-4">
              {type === "Create"
                ? "Create User"
                : type === "Edit"
                  ? "Edit User"
                  : "View User"}
            </h6> */}


            <div className="row g-3">
              <div className="col-3">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("first_name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.first_name && (
                  <p className="text-danger">{errors.first_name.message}</p>
                )}
              </div>

              <div className="col-3">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("last_name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.last_name && (
                  <p className="text-danger">{errors.last_name.message}</p>
                )}
              </div>

              <div className="col-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  {...register("email")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="col-3">
                <label className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  {...register("phone_number")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.phone_number && (
                  <p className="text-danger">{errors.phone_number.message}</p>
                )}
              </div>


              <div className="col-3">

                <RoleOptions
                  setStatus={(e: any) => {
                    setValue("role_id", e.value);
                    setSelectedRole(e.value); // Update selected role state
                  }}
                  data={data}
                  defaultRole={defaultRole}
                  type={type}
                  error={errors.role_id?.message}
                  disable={type === "Edit" && data?.role_name === "Customer" ? true : undefined}
                />

              </div>

              {selectedRole && selectedRole == 2 && (
                <>
                  <div className="col-3">
                    <CompanyOptions
                      setStatus={(e: any) => setValue("company_id", e.value)}
                      data={data}
                      type={type}
                      error={errors.company_id?.message}
                    />
                  </div>
                  <div className="col-3">
                    <Branch
                      setStatus={(e: any) => setValue("branch_id", e.value)}
                      data={data}
                      type={type}
                      error={errors.branch_id?.message}
                    />
                  </div>
                </>
              )}

              {selectedRole && selectedRole == 3 && (
                <div className="col-3">
                  <label className="form-label">
                    License No <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("license_no")}
                    disabled={type === "View"}
                    className={`form-control ${type === "View" ? "opacity-50" : ""
                      }`}
                  />
                  {errors.license_no && (
                    <p className="text-danger">{errors.license_no.message}</p>
                  )}
                </div>
              )}
              <CustomAddress data={data} type={type} error={errors} />

              <div className="col-3">
                <label className="form-label">Pincode</label>
                <input
                  {...register("pincode")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.pincode && (
                  <p className="text-danger">{errors.pincode.message}</p>
                )}
              </div>

              <div className="col-3">
                <StatusOptions
                  setStatus={(e: any) => setValue("status_id", e.value)}
                  data={data}
                  type={type}
                />
              </div>

              <div className="col-3">
                <label className="form-label">Address</label>
                <textarea
                  {...register("address")}
                  disabled={type === "View"}
                  placeholder="Write your address"
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="d-flex gap-4 mt-4 justify-content-end">
              <div className="btn-box border">
                <Link to={link} className="btn btn-sm">
                  Cancel
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading || type === "View"}
                className="w-full @xl:w-auto btn btn-sm btn-primary"
              >
                {type === "View"
                  ? "View"
                  : type === "Edit"
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
