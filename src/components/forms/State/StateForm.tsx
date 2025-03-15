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
import {
  createStateAPI,
  updateStateAPI,
} from "../../../services/country-service";
import { StateSchema, stateSchema } from "../../../validators/state.schema";

interface CreateServiceProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function StateForm({
  data,
  type = "Create",
}: CreateServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<StateSchema>({
    resolver: zodResolver(stateSchema),
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

  const onSubmit: SubmitHandler<StateSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createStateAPI(formData)
        : updateStateAPI(data?.id, formData));

      toast.success(result.message || "Operation successful");
      // navigate("/state");
      navigate("/states-tabs", { state: { activeTab: "state" } });

    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/states-tabs", { state: { activeTab: "state" } });
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
                ? "Create State"
                : type === "Edit"
                  ? "Edit State"
                  : "View State"}
            </h6> */}


            <div className="row g-3">
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
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

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">
                  Code<span className="text-danger">*</span>
                </label>
                <input
                  {...register("state_code")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.state_code && (
                  <p className="text-danger">{errors.state_code.message}</p>
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
                  {/* <Link to="/state" className="btn btn-sm ">
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
