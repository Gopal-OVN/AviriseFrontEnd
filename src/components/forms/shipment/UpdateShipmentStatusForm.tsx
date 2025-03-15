"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectedOrdersAtom } from "../../../redux/orderAtom";
import {
  updateOrderShipmentStatusAPI,
  uploadPODAPI,
} from "../../../services/order-service";

import { UpdateShipmentStatusSchema } from "../../../validators/UpdateShipmentStatus.schema";
import ShipmentStatusDropdown from "../../utils/dropdowns/ShipmentStatusDropdown";

interface ShipmentStatusProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
  closeModal: () => void;
  showUploadField?: boolean;
}

export default function UpdateShipmentStatusForm({
  data,
  type = "Edit",
  closeModal,
  showUploadField = false,
}: ShipmentStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [selectedOrders] = useAtom(selectedOrdersAtom);
  const [statusName, setStatusName] = useState<string | null>(null);
  const methods = useForm<UpdateShipmentStatusSchema>({
    defaultValues: {
      shipment_status_id: data?.shipment_status_id || "",
      comment: data?.comment || "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async (orderId: string) => {
    if (!file) return;

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      await uploadPODAPI(orderId, fileData);
      // toast.success("File uploaded successfully");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to upload file");
    }
  };

  const onSubmit: SubmitHandler<UpdateShipmentStatusSchema> = async (
    formData
  ) => {
    setIsLoading(true);

    try {

      const payload = {
        ...formData,
        order_trackings: formData.order_trackings ?? {
          order_id: 0,
          is_active: true,
        },
      };

      const orderIds = selectedOrders.length
        ? selectedOrders
        : [data?.order_id];

      for (const orderId of orderIds) {
        await updateOrderShipmentStatusAPI(orderId, payload);
        if (file) {
          await handleFileUpload(orderId);
        }
      }

      toast.success("Order(s) updated successfully");
      navigate("/order-tabs", {
        state: { activeTab: formData.shipment_status_id || "Pending" },
      });
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
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
                <ShipmentStatusDropdown
                  setStatus={(selected: any) => {
                    setValue("shipment_status_id", selected.value);
                    setStatusName(selected.label);
                  }}
                  data={data}
                  type={type}
                  error={errors?.shipment_status_id?.message}
                />
              </div>

              <div className="">
                <label className="form-label">
                  Comment<span className="text-danger">*</span>
                </label>
                <textarea
                  {...register("comment")}
                  disabled={type === "View"}
                  className={`form-control ${type === "View" ? "opacity-50" : ""
                    }`}
                  rows={3}
                  style={{ minHeight: "50px" }}
                />
                {errors.comment && (
                  <p className="text-danger">{errors.comment.message}</p>
                )}
              </div>
              {showUploadField && statusName == "Delivered" && (
                <div>
                  <h6>Upload File</h6>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-sm d-flex border "
                >
                  Cancel
                </button>

                {selectedOrders && selectedOrders.length > 0 && (
                  <button
                    type="submit"
                    className="btn btn-sm d-flex btn-primary "
                    disabled={isLoading}
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
