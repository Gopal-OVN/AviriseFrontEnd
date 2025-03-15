import { useEffect, useState } from "react";
import { fetchRoleAPI } from "../../../services/auth-service";
import { useFormContext } from "react-hook-form";

const RoleForm = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [roles, setRoles] = useState<{ role_id: string; role_name: string }[]>(
    []
  );
  const selectedRoles = watch("role_ids") || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await fetchRoleAPI();
        setRoles(rolesData.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (roleId: string, isChecked: boolean) => {
    setValue(
      "role_ids",
      isChecked
        ? [...selectedRoles, roleId]
        : selectedRoles.filter((id: string) => id !== roleId)
    );
  };

  return (
    <div className="bg-white p-4">
      <h6>Select Roles:</h6>
      <div className="row">
        {roles.map((role) => (
          <div key={role.role_id} className="col-md-4 col-sm-6 col-12 mb-2">
            <input
              type="checkbox"
              id={`role-${role.role_id}`}
              className="form-check-input"
              checked={selectedRoles.includes(role.role_id)}
              onChange={(e) =>
                handleCheckboxChange(role.role_id, e.target.checked)
              }
            />
            <label
              htmlFor={`role-${role.role_id}`}
              className="form-check-label text-gray-700 ms-2"
            >
              {role.role_name}
            </label>
          </div>
        ))}
      </div>
      {errors.role_ids?.message && (
        <p className="text-danger">{String(errors.role_ids.message)}</p>
      )}
    </div>
  );
};

export default RoleForm;
