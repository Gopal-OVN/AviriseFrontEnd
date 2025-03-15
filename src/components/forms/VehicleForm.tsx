"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { vehicleSchema, VehicleSchema } from "../../validators/vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicleAPI, updateVehicleAPI } from "../../services/vehicle";
import { toast } from "react-toastify";
import { VehicleTypeEnum } from "../../enum/enum";

interface CreateVehicleProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function VehicleForm({
  data,
  type = "Create",
}: CreateVehicleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: data
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  const isActive = useWatch({ control, name: "is_active" });

  const onSubmit: SubmitHandler<VehicleSchema> = async (formData) => {
    setIsLoading(true);

    try {

      const result = await (type === "Create"
        ? createVehicleAPI(formData)
        : updateVehicleAPI(data?.id, formData)); // Ensure `id` is correct

      toast.success(result.message || "Create successful");
      navigate("/vehicle");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    finally {
      setIsLoading(false);
    }
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
              {type === "Create" ? "Create Vehicle" : type === "Edit" ? "Edit Vehicle" : "View Vehicle"}
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
                <label className="form-label">Vehicle Number<span className="text-danger">*</span></label>
                <input
                  {...register("vehicle_number")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.vehicle_number && (
                  <p className="text-danger">{errors.vehicle_number.message}</p>
                )}
              </div>


              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Insurance Validity<span className="text-danger">*</span></label>
                <input type="date"
                  {...register("insurance_validity")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.insurance_validity && (
                  <p className="text-danger">{errors.insurance_validity.message}</p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">RC Validity<span className="text-danger">*</span></label>
                <input type="date"
                  {...register("rc_validity")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.rc_validity && (
                  <p className="text-danger">{errors.rc_validity.message}</p>
                )}
              </div>


              {/* Vehicle Type Dropdown */}
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Vehicle Type<span className="text-danger">*</span></label>
                <select
                  {...register("vehicle_type")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""}`}
                >
                  <option value="">Select Vehicle Type</option>
                  {Object.values(VehicleTypeEnum).map((vehicleType) => (
                    <option key={vehicleType} value={vehicleType}>
                      {vehicleType}
                    </option>
                  ))}
                </select>
                {errors.vehicle_type && (
                  <p className="text-danger">{errors.vehicle_type.message}</p>
                )}
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
                        onChange={(e) => setValue("is_active", e.target.checked)}
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
                  <Link to="/vehicle" className="btn btn-sm ">
                    Cancel
                  </Link>
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
    </div >
  );
}
