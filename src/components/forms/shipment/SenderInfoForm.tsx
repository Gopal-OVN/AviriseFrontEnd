import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toggleEditAddressModalOpen } from "../../../redux/features/editAddressModalSlice";
import { useAppDispatch } from "../../../redux/hooks";
import CustomAddress from "../company/custom-address";
import { useAtom } from "jotai";
import { senderAddressAtom } from "../../../redux/jotaiStore/addressbookAtom";

export default function SenderInfoForm({ data, type, errors }: any) {
  const { register, setValue, watch, getValues } = useFormContext();

  const [selectedAddress] = useAtom(senderAddressAtom);
  // const modifiedRef = useRef(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useAppDispatch();
  const trackedFields = [
    "company_name",
    "contact_name",
    "phone_number",
    "email",
    "address",
    "state_id",
    "city_id",
    "pincode",
    "is_manual_generate",
  ];
  useEffect(() => {
    if (selectedAddress) {
      Object.entries(selectedAddress).forEach(([key, value]) => {
        setValue(`sender_address.${key}`, value || ""); // Set value dynamically
      });
    }
  }, [selectedAddress, setValue]);

  useEffect(() => {
    const currentValues = getValues("sender_address"); // Get sender_address object
    const originalAddress = selectedAddress || data?.sender_address || {};

    // Check if any field value is changed
    const hasChanges = trackedFields.some(
      (key) => (originalAddress[key] || "") !== (currentValues?.[key] || "")
    );

    if (hasChanges) {
      setValue("sender_address_book_id", 0);

      setIsModified(true);
    } else {
      setValue(
        "sender_address_book_id",
        originalAddress?.address_book_id || ""
      );
      setIsModified(false);
    }
  }, [
    selectedAddress,
    ...trackedFields.map((field) => watch(`sender_address.${field}`)),
  ]);

  useEffect(() => {
    const unsubscribe = watch(() => setIsModified(true));
    return () => unsubscribe.unsubscribe(); // Explicitly call unsubscribe during cleanup
  }, [watch]);

  console.log("zod validation errors: ", errors);

  const openEditModal = () => {
    dispatch(toggleEditAddressModalOpen("sender"));
  };

  return (
    <div>
      <div className="section">
        <h5>Sender Details</h5>
        <div className="row mb-3">
          <div className="col-4">
            <button type="button" onClick={openEditModal} >
              Select from Address Book
            </button>
          </div>

          {/* Always show this checkbox if the form is modified */}
          {isModified && (
            <div className="form-check mt-2 col-4">
              <input
                {...register("sender_address.is_manual_generate")}
                className="form-check-input"
                type="checkbox"
              />
              <label className="form-check-label">You want to Save</label>
            </div>
          )}
        </div>

        {/* Form fields */}
        <div className="row mb-2">
          <div className="col-md-3">
            <label className="form-label">Company Name:</label>
            <input
              {...register("sender_address.company_name")}
              className="form-control"
              disabled={type === "View"}

            />
            {errors?.sender_address?.company_name && (
              <p className="text-danger">
                {errors.sender_address.company_name.message}
              </p>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Contact Person Name:</label>
            <input
              {...register("sender_address.contact_name")}
              className="form-control"
              placeholder="Enter Contact Name"
            />
            {errors?.sender_address?.contact_name && (
              <p className="text-danger">
                {errors.sender_address.contact_name.message}
              </p>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Phone No:</label>
            <input
              {...register("sender_address.phone_number")}
              className="form-control"
              placeholder="Enter Phone Number"
            />
            {errors?.sender_address?.phone_number && (
              <p className="text-danger">
                {errors.sender_address.phone_number.message}
              </p>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label">Email:</label>
            <input
              {...register("sender_address.email")}
              className="form-control"
              placeholder="Enter Email"
            />
            {errors?.sender_address?.email && (
              <p className="text-danger">
                {errors.sender_address.email.message}
              </p>
            )}
          </div>

        </div>

        <div className="row mb-3">



          <div className="col-md-3">
            <label className="form-label"> Address:</label>
            <textarea
              {...register("sender_address.address")}
              className="form-control"
              rows={1}
              placeholder="Enter Full Address"
            />
            {errors?.sender_address?.address && (
              <p className="text-danger">
                {errors.sender_address.address.message}
              </p>
            )}
          </div>

          <CustomAddress
            data={selectedAddress || data}
            type={type}
            error={errors}
          />

          <div className="col-3">
            <label className="form-label">Pincode:</label>
            <input
              {...register("sender_address.pincode")}
              className="form-control"
              placeholder="Enter Pincode"
            />
            {errors?.sender_address?.pincode && (
              <p className="text-danger">
                {errors.sender_address.pincode.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
