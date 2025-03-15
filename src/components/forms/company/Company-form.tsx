"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCompanyAPI,
  updateCompanyAPI,
} from "../../../services/company-service";
import {
  companySchema,
  CompanySchema,
} from "../../../validators/company.schema";
import IndustryType from "../../utils/dropdowns/IndustryType";
import StatusOptions from "../../utils/dropdowns/StatusOptions";
import CustomAddress from "./custom-address";
import CustomFields from "./custom-feilds";
interface CreateUserFormProps {
  data?: any; // Replace with your user data type
  type?: "Create" | "Edit" | "View";
}

export default function CompanyForm({
  data,
  type = "Create",
}: CreateUserFormProps) {
  const [isLoading, setLoading] = useState(false);

  const methods = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CompanySchema> = async (formData) => {
    setLoading(true);
    try {
      const result = await (type === "Create"
        ? createCompanyAPI(formData)
        : updateCompanyAPI(data?.id, formData));

      toast.success(result.message || "Operation successful");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred");
    } finally {
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
                ? "Create Company"
                : type === "Edit"
                  ? "Edit Company"
                  : "View Company"}
            </h6> */}

            <div className="row g-3">
              {/* Company Name */}
              <div className="col-4">
                <label className="form-label">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              {/* GST Number */}
              <div className="col-4">
                <label className="form-label">
                  GST Number <span className="text-danger">*</span>
                </label>
                <input
                  {...register("gst_number")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.gst_number && (
                  <p className="text-danger">{errors.gst_number.message}</p>
                )}
              </div>

              {/* Registration Number */}
              <div className="col-4">
                <label className="form-label">
                  Registration Number <span className="text-danger">*</span>
                </label>
                <input
                  {...register("registration_number")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.registration_number && (
                  <p className="text-danger">
                    {errors.registration_number.message}
                  </p>
                )}
              </div>

              {/* User Limit */}
              <div className="col-4">
                <label className="form-label">
                  User Limit <span className="text-danger">*</span>
                </label>
                <input
                  {...register("user_limit")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.user_limit && (
                  <p className="text-danger">{errors.user_limit.message}</p>
                )}
              </div>

              <div className="col-4">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
              </div>
              <IndustryType
                setStatus={(e: any) => setValue("industry_type_id", e.value)}
                data={data}
                type={type}
                error={errors.industry_type_id?.message} // Pass error message here
              />

              <CustomAddress data={data} type={type} error={errors} />
              <CustomFields />
              {type == "Edit" && (
                <StatusOptions
                  setStatus={(e: any) => setValue("globle_status_id", e.value)}
                  data={data}
                  type={type}
                  error={errors.industry_type_id?.message}
                />
              )}

              {/* Address */}
              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  {...register("address")}
                  disabled={type === "View"}
                  placeholder="Enter address"
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-4 mt-4 justify-content-end">
              <Link to="/companies" className="btn btn-sm">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || type === "View"}
                className="w-full btn btn-sm btn-primary"
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
