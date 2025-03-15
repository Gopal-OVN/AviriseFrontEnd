import { useEffect, useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { fetchIndustryAPI } from "../../../services/company-service";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";

const IndustryType = ({
  setStatus,
  data,
  type,
  error,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any; // Replace with your data type
  type?: "Create" | "Edit" | "View";
  error?: string;
}) => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const response = await fetchIndustryAPI();
        setStatusList(
          response.industry_types.map(
            ({ id, name }: { id: number; name: string }) => ({
              value: id,
              label: name,
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching statuses");
      }
    };

    fetchIndustry();
  }, []);

  useEffect(() => {
    if (data?.globle_status_id) {
      const matchedStatus = statusList.find(
        (status: Option) => status.value === data.globle_status_id
      );
      if (matchedStatus) {
        setSelectedStatus(matchedStatus);
        // setStatus?.(matchedStatus); // Update the parent component's state
      }
    }
  }, [type, data, statusList]);

  return (
    <div className="col-4">
      <label className="form-label">
        Industry Type <span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's state
        }}
        placeholder="Select Industry Type"
        isDisabled={type === "View"}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            color: darkMode ? "#c4c4c4" : "#222222",
            fontSize: 14,
            borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#dbeaea",
          }),
        }}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default IndustryType;
