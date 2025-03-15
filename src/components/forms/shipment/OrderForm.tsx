"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  createOrderAPI,
  updateOrderAPI,
} from "../../../services/order-service";
import { orderSchema } from "../../../validators/order.schema";
import BookingInfoForm from "./BookingInfoForm";
import CustomDimension from "./CustomDimension";
import OrderItemForm from "./OrderItemForm";
import ReceiverInfoForm from "./ReciverInfoForm";
import SenderInfoForm from "./SenderInfoForm";

// Initialize toast notifications
interface OrderProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
  link?: any;
}

export default function OrderForm({ data, type = "Create" }: OrderProps) {
  const navigate = useNavigate();
  const methods = useForm<any>({
    resolver: zodResolver(orderSchema),
    defaultValues: data,
  });

  console.log("data,,,,,,", data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<any> = async (formData) => {
    console.log("order submited data: ", formData);
    try {
      const payload = {
        ...formData,
        order_trackings: formData.order_trackings ?? {
          order_id: 0,
          is_active: true,
        },
      };
      const result = await (type === "Create"
        ? createOrderAPI(payload)
        : updateOrderAPI(data?.order_id, payload));

      toast.success(result.message || "Operation successful");
      // navigate("order-tabs");
      navigate("/order-tabs", { state: { activeTab: "Order Created" } });
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/order-tabs", { state: { activeTab: "Order Created" } });
  };
  return (
    <div>
      <div className="panel-body ">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow flex-col gap-6 p-6"
          >
            <div className="row g-3 ">
              <BookingInfoForm data={data} type={type} errors={errors} />

              <div className="container bg-white p-4 mt-4 shadow panel">
                <SenderInfoForm data={data} type={type} errors={errors} />
              </div>

              <div className="container bg-white p-4 mt-4 shadow panel">
                <ReceiverInfoForm data={data} type={type} errors={errors} />
              </div>

              <div className="container bg-white p-4 mt-4 shadow panel">
                <OrderItemForm data={data} type={type} errors={errors} />

                <CustomDimension data={data} type={type} errors={errors} />
              </div>

              {/* <AdditionalInfoForm /> */}

              <div className="d-flex  justify-content-end  gap-2">
                <button onClick={handleCancel} className="btn btn-can">
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Create Order
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
