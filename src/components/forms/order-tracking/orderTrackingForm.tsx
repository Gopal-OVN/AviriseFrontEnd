import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createOrderTrackingAPI,
  updateOrderTrackingAPI,
} from "../../../services/orderTracking-service";
import {
  orderTrackingSchema,
  OrderTrackingSchema,
} from "../../../validators/orderTracking.schema";
import OrderDropdownTrac from "../../utils/dropdowns/OrderDropdownTrac";

interface CreateOrderTrackingProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function OrderTrackingForm({
  data,
  type = "Create",
}: CreateOrderTrackingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<OrderTrackingSchema>({
    resolver: zodResolver(orderTrackingSchema),
    defaultValues: data ?? { order_id: "" },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  const isActive = useWatch({ control, name: "is_active" });

  const onSubmit: SubmitHandler<OrderTrackingSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const result = await (type === "Create"
        ? createOrderTrackingAPI(formData)
        : updateOrderTrackingAPI(data?.order_tracking_id, formData)); // Ensure `id` is correct

      toast.success(result.message || "Create successful");
      navigate("/order-tracking");
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
              <OrderDropdownTrac
                setStatus={(e: any) => setValue("order_id", e.value)}
                data={data}
                type={type}
                error={errors?.order_id?.message}
              />

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
                  <Link to="/order-tracking" className="btn btn-sm ">
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
