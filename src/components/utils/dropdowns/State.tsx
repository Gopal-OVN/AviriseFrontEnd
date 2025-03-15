import { useEffect, useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { fetchStateAPI } from "../../../services/country-service";

const StateFeilds = ({
  setStatus,
  data,
  type,
  countryId, // Accept countryId prop
  error,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any; // Replace with your data type
  type?: "Create" | "Edit" | "View";
  countryId?: number; // Accept countryId as an optional prop
  error?: string;
}) => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchStates = async () => {
      if (!countryId) return; // Only fetch if countryId is available
      try {
        const response = await fetchStateAPI(countryId); // Pass countryId to the API
        setStatusList(
          response.states.map(({ id, name }: { id: number; name: string }) => ({
            value: id,
            label: name,
          }))
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching states");
      }
    };

    fetchStates();
  }, [countryId]); // Re-fetch when countryId changes

  useEffect(() => {
    if (data?.state_id) {
      const matchedState = statusList.find(
        (state: Option) => state.value === data.state_id
      );
      if (matchedState) {
        setSelectedStatus(matchedState);
        // setStatus?.(matchedState); // Update the parent component's state
      }
    }
  }, [type, data, statusList]);

  return (
    <div>
      <label className="form-label">
        State<span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's state
        }}
        placeholder="Select State"
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

export default StateFeilds;
