import { useEffect, useState } from "react";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import { fetchPaymentModeAPI } from "../../../services/paymentMode-service";
import { toast } from "react-toastify";
import Select from "react-select";

const PaymentModeDropdown = ({
  setStatus,
  data,
  error,
  type,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any;
  type?: "Create" | "Edit" | "View";
  error?: string;
}) => {
  const [statusList, setStatusList] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchPaymentModes = async () => {
      //   if (!countryId) return; // Only fetch if countryId is available
      try {
        const response = await fetchPaymentModeAPI(); // Pass countryId to the API
        setStatusList(
          response.map(
            ({
              payment_id,
              payment_name,
            }: {
              payment_id: number;
              payment_name: string;
            }) => ({
              value: payment_id,
              label: payment_name,
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching payment modes");
      }
    };

    fetchPaymentModes();
  }, []);

  useEffect(() => {
    if (data?.payment_mode_id) {
      const matchedServiceType = statusList.find(
        (state: Option) => state.value === data.payment_mode_id
      );
      if (matchedServiceType) {
        setSelectedStatus(matchedServiceType);
        // setStatus?.(matchedServiceType); // Update the parent component's service
      }
    }
  }, [type, data, statusList]);

  return (
    <div className="col-4">
      <label className="form-label">
        Payment Mode<span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's service
        }}
        placeholder="Select Payment Mode"
        isDisabled={type === "View"}
        isClearable={true}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            color: darkMode ? "#c4c4c4" : "#222222",
            fontSize: 14,
            borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#222323",
          }),
        }}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default PaymentModeDropdown;
