"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectedOrdersAtom } from "../../../redux/orderAtom";
import { assignDriverAPI } from "../../../services/order-service";
import {
  driverVehicleSchema,
  DriverVehicleSchema,
} from "../../../validators/DriverVehicle.schema";
import DriverDropdown from "../../utils/dropdowns/DriverDropdown";
import VehicleDropdown from "../../utils/dropdowns/VehicleDropdown";

interface CreateVehicleProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
  closeModal: () => void;
}

export default function DriverAssignForm({
  data,
  type = "Create",
  closeModal,
}: CreateVehicleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOrders] = useAtom(selectedOrdersAtom);

  const methods = useForm<DriverVehicleSchema>({
    resolver: zodResolver(driverVehicleSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },

    setValue,
  } = methods;

  const onSubmit: SubmitHandler<DriverVehicleSchema> = async (formData) => {
    setIsLoading(true);

    try {
      const payload = {
        order_ids: selectedOrders, // Include selected orders
        request: {
          ...formData,
          order_trackings: formData.order_trackings ?? {
            order_id: 0,
            is_active: true,
          },
        },
      };

      const result = await assignDriverAPI(payload);

      toast.success(result.message || "Assignment successful");

      navigate("/order-tabs", { state: { activeTab: "Pending Pickup" } });

      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");

      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel shadow-none">
      <div className="panel-body">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-grow">
            <div className="row g-3 ">
              <div className="">
                <DriverDropdown
                  setStatus={(e: any) => setValue("driver_id", e.value)}
                  data={data}
                  type={type}
                  error={errors?.driver_id?.message}
                />
              </div>

              <div>
                {" "}
                <VehicleDropdown
                  setStatus={(e: any) => setValue("vehicle_id", e.value)}
                  data={data}
                  type={type}
                  error={errors?.vehicle_id?.message}
                />
              </div>

              <div>
                <label className="form-label">
                  Appointment Date<span className="text-danger">*</span>
                </label>
                <div
                  className="position-relative"
                  onClick={() =>
                    (
                      document.getElementById(
                        "appointmentDate"
                      ) as HTMLInputElement | null
                    )?.showPicker()
                  }
                >
                  <input
                    type="date"
                    id="appointmentDate"
                    {...register("appointment_date_time", {
                      setValueAs: (value) => (value ? new Date(value) : null),
                    })}
                    disabled={type === "View"}
                    className={`form-control ${type === "View" ? "opacity-50" : ""
                      }`}
                  />
                  {/* <i className="fa fa-calendar position-absolute end-0 top-50 translate-middle-y pe-2 text-primary"></i> */}
                </div>

                {errors.appointment_date_time && (
                  <p className="text-danger">
                    {errors.appointment_date_time.message}
                  </p>
                )}
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  onClick={closeModal}
                  className="btn btn-sm d-flex border "
                >
                  Cancel
                </button>
                {selectedOrders && selectedOrders.length > 0 && (
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-sm d-flex btn-primary"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
