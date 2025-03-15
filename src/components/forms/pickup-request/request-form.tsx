"use client";

import { FormProvider, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import PickupInfo from "./PickupInfo";
import SenderInfo from "./SenderInfo";
import ReciverInfo from "./ReciverInfo";
import ShipmentDetails from "./ShipmentDetails";

// Initialize toast notifications

export default function PickUpRequestForm() {
  const methods = useForm<any>({
    // resolver: zodResolver(companySchema),
    defaultValues: {}, // Define default values if needed
  });

  const {
    handleSubmit,
    formState: {},
  } = methods;

  const onSubmit: SubmitHandler<any> = async () => {
    toast.success("Submitted successfully!");
  };

  return (
    <div className="panel">
      <div className="panel-body">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow flex-col gap-6 p-6"
          >
            <div className="row g-3">
              {/* Booking Information */}
              <PickupInfo />

              <SenderInfo />

              <ReciverInfo />

              <ShipmentDetails />

              {/* Submit Button */}
              <div className="col-12 text-end gp-16">
                <button type="submit" className="btn mr-4">
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
