"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { createCityAPI, updateCityAPI } from "../../../services/city-service";
import { citySchema, CitySchema } from "../../../validators/city.schema";
import StateFeilds from "../../utils/dropdowns/State";

interface CreateServiceProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function CityForm({
  data,
  type = "Create",
}: CreateServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  // Watch the `is_active` field
  const isActive = useWatch({ control, name: "is_active" });

  const onSubmit: SubmitHandler<CitySchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createCityAPI(formData)
        : updateCityAPI(data?.id, formData));

      toast.success(result.message || "Operation successful");
      // navigate("/city");
      navigate("/states-tabs", { state: { activeTab: "city" } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/states-tabs", { state: { activeTab: "city" } });
  };



  return (
    <div className="panel">
      <div className="panel-body">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow flex-col gap-6 p-6"
          >
            {/* <h6 className="mb-4">
              {type === "Create"
                ? "Create City"
                : type === "Edit"
                  ? "Edit City"
                  : "View City"}
            </h6> */}

            <div className="row g-3">
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Name<span className="text-danger">*</span></label>
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


              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <StateFeilds
                  setStatus={(e: any) => setValue("state_id", e.value)}
                  data={data}
                  type={type}
                  countryId={1} // Pass the country_id to StateFeilds
                  error={errors?.state_id?.message}
                />
              </div>


              {type !== "Create" && (
                <div className="col-xxl-3 col-lg-4 col-sm-6">
                  <label className="form-label">Status</label>
                  <div className="d-flex align-items-center" style={{ marginTop: "16px" }}>
                    <div className="form-check form-switch me-2">
                      <input
                        type="checkbox"
                        {...register("is_active")}
                        disabled={type === "View"}
                        checked={isActive} // ✅ React controls the checked state
                        onChange={(e) =>
                          setValue("is_active", e.target.checked)
                        }
                        className="form-check-input"
                      />
                    </div>
                    <span className={isActive ? "text-success" : "text-danger"}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              )}

              <div className="col-12 text-end gp-16 d-flex gap-4 mt-4 justify-content-end">
                <div className="btn-box border p-1">

                  <button onClick={handleCancel} className="btn btn-sm">
                    Cancel
                  </button>

                  {/* <Link to="/city" className="btn btn-sm ">
                    Cancel
                  </Link> */}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={type === "View" || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
