import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Option } from "../../../types";
import Select from "react-select";
import { toast } from "react-toastify";
// import { fetchServiceTypeAPI } from "../../../services/serviceType-service";
// import useFetchUsers from "../../../hooks/useFetchUsers";
import { fetchDriverAPI } from "../../../services/driver-service";

const DriverDropdown = ({
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
  // console.log("datadatadatadata", data);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await fetchDriverAPI();
        setStatusList(
          response.map(
            ({ driver_id, name }: { driver_id: number; name: string }) => ({
              value: driver_id,
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
    if (data?.service_id) {
      const matchedServiceType = statusList.find(
        (service: Option) => service.value === data.service_id
      );
      if (matchedServiceType) {
        setSelectedStatus(matchedServiceType);
        // setStatus?.(matchedServiceType); // Update the parent component's service
      }
    }
  }, [type, data, statusList]);

  return (
    <div className="">
      <label className="form-label">
        Select Driver<span className="text-danger">*</span>
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

export default DriverDropdown;
