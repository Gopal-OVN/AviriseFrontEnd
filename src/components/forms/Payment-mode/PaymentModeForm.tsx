"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  paymentModeSchema,
  PaymentModeSchema,
} from "../../../validators/paymentMode.schema";
import {
  createPaymentModeAPI,
  updatePaymentModeAPI,
} from "../../../services/paymentMode-service";
import { Link, useNavigate } from "react-router-dom";

interface CreateServiceProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function PaymentModeForm({
  data,
  type = "Create",
}: CreateServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<PaymentModeSchema>({
    resolver: zodResolver(paymentModeSchema),
    defaultValues: {
      payment_name: data?.payment_name ?? "",
      description: data?.description ?? "",
      is_active: data?.is_active ?? true, // ✅ Ensure default value is set
    },
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

  const onSubmit: SubmitHandler<PaymentModeSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createPaymentModeAPI(formData)
        : updatePaymentModeAPI(data?.payment_id, formData));

      toast.success(result.message || "Operation successful");
      navigate("/payment-mode");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
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
              {type === "Create" ? "Create Payment Mode" : type === "Edit" ? "Edit Payment Mode" : "View Payment Mode"}
            </h6> */}

            <div className="row g-3">
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Name<span className="text-danger">*</span></label>
                <input
                  {...register("payment_name")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.payment_name && (
                  <p className="text-danger">{errors.payment_name.message}</p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Description</label>
                <input
                  {...register("description")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
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
                  <Link to="/payment-mode" className="btn btn-sm ">
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
    </div>
  );
}
