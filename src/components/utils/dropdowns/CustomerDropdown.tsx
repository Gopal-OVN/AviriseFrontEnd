import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { fetchUsersAPI } from "../../../services/user-service";
import { Option } from "../../../types";

const CustomerDropdown = ({
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
  const [statusList, setStatusList] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUsersAPI();
        console.log("Users Response:", response.users);

        if (Array.isArray(response.users)) {
          const formattedUsers = response.users
            .filter((user: any) => user.role_name == "Customer")
            .map(
              ({
                user_id,
                first_name,
                last_name,
              }: {
                user_id: number;
                first_name: string;
                last_name: string;
              }) => ({
                value: user_id,
                label: `${first_name} ${last_name}`, // Concatenate first_name and last_name
              })
            );
          setStatusList(formattedUsers);
        } else {
          console.error("Invalid response format");
          toast.error("Invalid response format from server");
        }
      } catch (error: any) {
        toast.error(error.message || "Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (data?.customer_id && statusList.length > 0) {
      const matchedState = statusList.find(
        (state) => state.value === data.customer_id
      );
      if (matchedState) {
        setSelectedStatus(matchedState);
      }
    }
  }, [data, statusList]);

  return (
    <div className="col-4">
      <label className="form-label">
        Customer <span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption);
        }}
        placeholder="Select Customer"
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

export default CustomerDropdown;
