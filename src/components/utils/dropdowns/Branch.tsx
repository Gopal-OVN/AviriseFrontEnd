import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { fetchBranchesAPI } from "../../../services/branch-service";
import { Option } from "../../../types";

const Branch = ({
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

  console.log("dataaa", data);
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetchBranchesAPI();
        setStatusList(
          response.map(({ id, name }: { id: number; name: string }) => ({
            value: id,
            label: name,
          }))
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching statuses");
      }
    };

    fetchStatuses();
  }, []);

  useEffect(() => {
    if (data?.globle_status_id) {
      const matchedStatus = statusList.find(
        (status: Option) => status.value === data.globle_status_id
      );
      if (matchedStatus) {
        setSelectedStatus(matchedStatus);
      }
    }
  }, [type, data, statusList]);

  return (
    <div >
      <label className="form-label">
        Branch <span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's state
        }}
        placeholder="Select branch"
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

export default Branch;
