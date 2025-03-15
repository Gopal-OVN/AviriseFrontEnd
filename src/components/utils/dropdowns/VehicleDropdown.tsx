import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { Option } from "../../../types";
import { getVehicleAPI } from "../../../services/vehicle";

const VehicleDropdown = ({
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
    const fetchVehicles = async () => {
      try {
        const response = await getVehicleAPI(); // Pass countryId to the API
        setStatusList(
          response.map(({ id, name }: { id: number; name: string }) => ({
            value: id,
            label: name,
          }))
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching vehicles");
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    if (data?.vehicle_id) {
      const matchedVehicle = statusList.find(
        (vehicle: Option) => vehicle.value === data.vehicle_id
      );
      if (matchedVehicle) {
        setSelectedStatus(matchedVehicle);
        // setStatus?.(matchedVehicle); // Update the parent component's vehicle
      }
    }
  }, [type, data, statusList]);

  return (
    <div className="">
      <label className="form-label">
        Select Vehicle<span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's vehicle
        }}
        placeholder="Select Vehicle"
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

export default VehicleDropdown;
