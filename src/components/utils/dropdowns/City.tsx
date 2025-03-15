import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
// import { fetchCityAPI } from "../../../services/country-service";
import { Option } from "../../../types";
import { fetchCityAPI } from "../../../services/city-service";

const CityFeilds = ({
  setStatus,
  data,
  type,
  error,
  stateId,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any; // Replace with your data type
  type?: "Create" | "Edit" | "View";
  error?: string;
  stateId?: number;
}) => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchIndustry = async () => {
      if (!stateId) return;
      try {
        const response = await fetchCityAPI(stateId);
        setStatusList(
          response.cities.map(({ id, name }: { id: number; name: string }) => ({
            value: id,
            label: name,
          }))
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching statuses");
      }
    };

    fetchIndustry();
  }, [stateId]);

  useEffect(() => {
    if (data?.city_id) {
      const matchedStatus = statusList.find(
        (status: Option) => status.value === data.city_id
      );
      if (matchedStatus) {
        setSelectedStatus(matchedStatus);
        // setStatus?.(matchedStatus); // Update the parent component's state
      }
    }
  }, [type, data, statusList]);

  return (
    <div >
      <label className="form-label">
        City<span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's state
        }}
        placeholder="Select City"
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

export default CityFeilds;
