import { useEffect, useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import { fetchRoleAPI } from "../../../services/auth-service";
type RolesTypeProps = {
  onRoleChange: (roleId: string | null) => void;
};

const RolesType = ({ onRoleChange }: RolesTypeProps) => {
  const [status, setStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [roleList, setRoleList] = useState<Option[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchRoleAPI();
        const mappedRoles = response.roles.map((role: any) => ({
          label: role.role_name,
          value: role.role_id,
        }));
        setRoleList(mappedRoles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (selectedOption: Option | null) => {
    setStatus(selectedOption);
    onRoleChange(selectedOption ? selectedOption.value : null); // Pass roleId or null
  };

  return (
    <Select
      options={roleList}
      value={status}
      className="ar-select"
      onChange={handleRoleChange}
      placeholder="Select Role"
      isClearable={true}
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
  );
};

export default RolesType;
