import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Option } from "../../../types";
import Select from "react-select";
import { toast } from "react-toastify";
import { fetchServiceTypeAPI } from "../../../services/serviceType-service";

const ServiceTypeDropdown = ({
  setStatus,
  data,
  errors,
  type,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any;
  type?: "Create" | "Edit" | "View";
  errors?: string;
}) => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      //   if (!countryId) return; // Only fetch if countryId is available
      try {
        const response = await fetchServiceTypeAPI(); // Pass countryId to the API
        setStatusList(
          response.map(
            ({ service_id, name }: { service_id: number; name: string }) => ({
              value: service_id,
              label: name,
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching services");
      }
    };

    fetchServiceTypes();
  }, []);

  useEffect(() => {
    if (data?.service_type_id) {
      const matchedServiceType = statusList.find(
        (service: Option) => service.value === data.service_type_id
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
        Service Type<span className="text-danger">*</span>
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
      {errors && <p className="text-danger">{errors}</p>}
    </div>
  );
};

export default ServiceTypeDropdown;
