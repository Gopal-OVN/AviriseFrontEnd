import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"; // Use useFormContext instead of useForm
import { toggleEditAddressModalOpen } from "../../../redux/features/editAddressModalSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { reciverAddressAtom } from "../../../redux/jotaiStore/reciverAddressAtom";
import CustomAddress from "../company/custom-address";

export default function ReciverInfoForm({ data, type, errors }: any) {
  const { register, watch, setValue, getValues } = useFormContext();
  const [isModified, setIsModified] = useState(false); // Track modifications
  // const modifiedRef = useRef(false);
  const dispatch = useAppDispatch();
  const [selectedAddress] = useAtom(reciverAddressAtom);
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
        setValue(`receiver_address.${key}`, value || ""); // Set value dynamically
      });
    }
  }, [selectedAddress, setValue]);

  useEffect(() => {
    const currentValues = getValues("receiver_address"); // Get receiver_address object
    const originalAddress = selectedAddress || data?.receiver_address || {};

    // Check if any field value is changed
    const hasChanges = trackedFields.some(
      (key) => (originalAddress[key] || "") !== (currentValues?.[key] || "")
    );

    if (hasChanges) {
      setValue("receiver_address_book_id", 0);

      setIsModified(true);
    } else {
      setValue(
        "receiver_address_book_id",
        originalAddress?.address_book_id || ""
      );
      setIsModified(false);
    }
  }, [
    selectedAddress,
    ...trackedFields.map((field) => watch(`receiver_address.${field}`)),
  ]);

  useEffect(() => {
    const unsubscribe = watch(() => setIsModified(true));
    return () => unsubscribe.unsubscribe(); // Explicitly call unsubscribe during cleanup
  }, [watch]);

  const openEditModal = () => {
    dispatch(toggleEditAddressModalOpen("h"));
  };

  return (
    <div>
      <div className="section">
        <h5>Reciver Details</h5>
        <div className="row mb-3">
          <div className="col-4">
            <button type="button" onClick={openEditModal}>
              Select from Address Book
            </button>
          </div>

          {/* Always show this checkbox if the form is modified */}
          {isModified && (
            <div className="form-check mt-2 col-4">
              <input
                {...register("receiver_address.is_manual_generate")}
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
              {...register("receiver_address.company_name")}
              className="form-control"
              disabled={type === "View"}
            />
            {errors?.receiver_address?.company_name && (
              <p className="text-danger">
                {errors.receiver_address.company_name.message}
              </p>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Contact Person Name:</label>
            <input
              {...register("receiver_address.contact_name")}
              className="form-control"
              placeholder="Enter Contact Name"
            />
            {errors?.receiver_address?.contact_name && (
              <p className="text-danger">
                {errors.receiver_address.contact_name.message}
              </p>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Phone No:</label>
            <input
              {...register("receiver_address.phone_number")}
              className="form-control"
              placeholder="Enter Phone Number"
            />
            {errors?.receiver_address?.phone_number && (
              <p className="text-danger">
                {errors.receiver_address.phone_number.message}
              </p>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label">Email:</label>
            <input
              {...register("receiver_address.email")}
              className="form-control"
              placeholder="Enter Email"
            />
            {errors?.receiver_address?.email && (
              <p className="text-danger">
                {errors.receiver_address.email.message}
              </p>
            )}
          </div>

        </div>

        <div className="row mb-3">



          <div className="col-md-3">
            <label className="form-label"> Address:</label>
            <textarea
              {...register("receiver_address.address")}
              className="form-control"
              rows={2}
              placeholder="Enter Full Address"
            />
            {errors?.receiver_address?.address && (
              <p className="text-danger">
                {errors.receiver_address.address.message}
              </p>
            )}
          </div>

          <CustomAddress
            data={selectedAddress || data}
            type={type}
            error={errors}
          />

          <div className="col-md-3">
            <label className="form-label">Pincode:</label>
            <input
              {...register("receiver_address.pincode")}
              className="form-control"
              placeholder="Enter Pincode"
            />
            {errors?.receiver_address?.pincode && (
              <p className="text-danger">
                {errors.receiver_address.pincode.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
