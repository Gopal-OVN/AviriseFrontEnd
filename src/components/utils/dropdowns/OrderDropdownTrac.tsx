import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Option } from "../../../types";
import Select from "react-select";
import { toast } from "react-toastify";
// import { fetchServiceTypeAPI } from "../../../services/serviceType-service";
import { getOrderAPI } from "../../../services/order-service";

const OrderDropdownTrac = ({
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
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchOrder = async () => {
      //   if (!countryId) return; // Only fetch if countryId is available
      try {
        const response = await getOrderAPI(); // Pass countryId to the API
        setStatusList(
          response.map(
            ({
              order_id,
              docket_no,
            }: {
              order_id: number;
              docket_no: number;
            }) => ({
              value: order_id,
              label: docket_no,
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching orders");
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    if (data?.order_id) {
      const matchedOrder = statusList.find(
        (service: Option) => service.value === data.order_id
      );
      if (matchedOrder) {
        setSelectedStatus(matchedOrder);
        // setStatus?.(matchedOrder); // Update the parent component's service
      }
    }
  }, [type, data, statusList]);

  return (
    <div className="col-4">
      <label className="form-label">
        Select Order<span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's service
        }}
        placeholder="Select Service Type"
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

export default OrderDropdownTrac;
