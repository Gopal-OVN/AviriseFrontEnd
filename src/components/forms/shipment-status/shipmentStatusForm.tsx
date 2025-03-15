import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  shipmentStatusSchema,
  ShipmentStatusSchema,
} from "../../../validators/shipmentStatus.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createShipmentStatusAPI,
  updateShipmentStatusAPI,
} from "../../../services/shipment-status-service";
import { toast } from "react-toastify";

interface CreateShipmentStatusProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function ShipmentStatusForm({
  data,
  type = "Create",
}: CreateShipmentStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<ShipmentStatusSchema>({
    resolver: zodResolver(shipmentStatusSchema),
    defaultValues: data ?? { name: "", description: "" },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  const isActive = useWatch({ control, name: "is_active" });

  const onSubmit: SubmitHandler<ShipmentStatusSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createShipmentStatusAPI(formData)
        : updateShipmentStatusAPI(data?.shipment_status_id, formData)); // Ensure `id` is correct

      toast.success(result.message || "Create successful");
      navigate("/shipment-status");
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
                            {type === "Create" ? "Create Shipment Status" : type === "Edit" ? "Edit Shipment Status" : "View Shipment Status"}
                        </h6> */}

            <div className="row g-3">
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  {...register("shipment_status_name")}
                  disabled={type === "View"}
                  className={`form-control ${
                    type === "View" ? "opacity-50" : ""
                  }`}
                />
                {errors.shipment_status_name && (
                  <p className="text-danger">
                    {errors.shipment_status_name.message}
                  </p>
                )}
              </div>

              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Description</label>
                <input
                  {...register("description")}
                  disabled={type === "View"}
                  className={`form-control ${
                    type === "View" ? "opacity-50" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div>

              {type !== "Create" && (
                <div className="col-xxl-3 col-lg-4 col-sm-6">
                  <label className="form-label">Status</label>
                  <div
                    className="d-flex align-items-center"
                    style={{ marginTop: "16px" }}
                  >
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
                  <Link to="/shipment-status" className="btn btn-sm ">
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
