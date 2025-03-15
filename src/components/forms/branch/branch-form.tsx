"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createBranchAPI,
  updateBranchAPI,
} from "../../../services/branch-service";
// import { fetchCompaniesAPI } from "../../../services/company-service";
import { Link } from "react-router-dom";
import { BranchSchema } from "../../../validators/branch.schema";
import CompanyOptions from "../../utils/dropdowns/CompanyOptions";

interface CreateUserFormProps {
  data?: any; // Replace with your user data type
  type?: "Create" | "Edit" | "View";
}

export default function BranchForm({
  data,
  type = "Create",
}: CreateUserFormProps) {
  const [isLoading, setLoading] = useState(false);
  // const [dataList, setDataList] = useState<any[]>([]); // Expecting an array of companies

  console.log("data of branch edit", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BranchSchema>({
    defaultValues: {
      name: data?.name || "",
      contact_number: data?.contact_number || "",
      email: data?.email || "",
      company_id: data?.company_id || "", // Make sure the company_id is populated for editing
    },
  });

  const onSubmit: SubmitHandler<BranchSchema> = async (formData) => {
    setLoading(true);
    try {
      // Clean the form data
      const cleanedFormData = JSON.parse(JSON.stringify(formData));

      const result = await (type === "Create"
        ? createBranchAPI(cleanedFormData)
        : updateBranchAPI(data?.id, cleanedFormData));

      toast.success(result.message || "Operation successful");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       const response = await fetchCompaniesAPI();
  //       setDataList(response); // Assuming the API returns an array of companies
  //     } catch (error: any) {
  //       toast.error(error.message || "Error fetching companies");
  //     }
  //   };
  //   fetchCompanies();
  // }, []);

  useEffect(() => {
    if (data?.company_id) {
      setValue("company_id", data.company_id); // Ensure company_id is set for editing
    }
  }, [data, setValue]);

  return (
    <div className="panel mb-4">
      <div className="panel-body product-title-input">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col gap-6 p-6"
        >

          {/* <h6 className="mb-4">
            {type === "Create"
              ? "Create Branch"
              : type === "Edit"
                ? "Edit Branch"
                : "View Branch"}
          </h6> */}

          <div className="row g-3">
            <div className="col-4">
              <label className="form-label">
                Branch Name <span className="text-danger">*</span>
              </label>
              <input
                {...register("name", {
                  required: "Branch Name is required",
                })}
                disabled={type === "View"}
                placeholder="Enter branch name"
                className={`form-control ${type === "View" ? "opacity-50" : ""
                  }`}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>

            <div className="col-4">
              <label className="form-label">
                Contact Number <span className="text-danger">*</span>
              </label>
              <input
                {...register("contact_number", {
                  required: "Contact number is required",
                })}
                disabled={type === "View"}
                placeholder="Enter contact number"
                className={`form-control ${type === "View" ? "opacity-50" : ""
                  }`}
              />
              {errors.contact_number && (
                <p className="text-danger">{errors.contact_number.message}</p>
              )}
            </div>

            <div className="col-4">
              <label className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                disabled={type === "View"}
                placeholder="Enter email"
                className={`form-control ${type === "View" ? "opacity-50" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            <CompanyOptions
              setStatus={(e: any) => setValue("company_id", e.value)}
              data={data}
              type={type}
              error={errors?.company_id?.message}
            />

            {/* <div className="col-4">
              <label className="form-label">Company</label>
              <select
                {...register("company_id", {
                  required: "Company is required",
                })}
                disabled={type === "View"}
                className={`form-control ${type === "View" ? "opacity-50" : ""
                  }`}
              >
                {dataList?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.company_id && (
                <p className="text-danger">{errors.company_id.message}</p>
              )}
            </div> */}
          </div>

          <div className="d-flex gap-4 mt-4 justify-content-end">
            <div className="btn-box border">
              <Link to="/branches" className="btn btn-sm ">
                Cancel
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || type === "View"}
              className="w-full @xl:w-auto btn btn-sm btn-primary"
            >
              {type === "View" ? "View" : type === "Edit" ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
