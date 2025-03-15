import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { fetchRoleAPI } from "../../../services/auth-service";
import { Option } from "../../../types";

const RoleOptions = ({
  setStatus,
  data,
  type,
  error,
  defaultRole,
  disable,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any; // Replace with your data type
  type?: "Create" | "Edit" | "View";
  error?: string;
  defaultRole?: any;
  disable?: true;
}) => {
  const [statusList, setStatusList] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetchRoleAPI();
        setStatusList(
          response.roles.map(
            ({
              role_id,
              role_name,
            }: {
              role_id: number;
              role_name: string;
            }) => ({
              value: role_id,
              label: role_name,
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching statuses");
      }
    };

    fetchStatuses();
  }, []);

  useEffect(() => {
    console.log("defaultRole", defaultRole);

    const roleId = defaultRole ? defaultRole : data?.role_id;
    console.log("roleId", roleId);

    if (roleId) {
      const matchedStatus = statusList.find(
        (status: Option) => status.value === roleId
      );
      if (matchedStatus) {
        setSelectedStatus(matchedStatus);
        setStatus?.(matchedStatus);
      }
    }
  }, [type, data, statusList, defaultRole]);

  return (
    <div className="">
      <label className="form-label">
        Role <span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption: any) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption); // Update the parent component's state
        }}
        placeholder="Select Roles"
        isDisabled={type === "View" || disable}
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

export default RoleOptions;
