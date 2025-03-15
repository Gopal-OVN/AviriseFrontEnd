import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchPermissionAPI } from "../../../services/permission-service";

const PermissionForm = ({ data }: any) => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const [permissions, setPermissions] = useState<{ permission_id: number; permission_name: string }[]>([]);

    // Ensure permission_ids include initial values or an empty array
    const selectedPermissions = watch("permission_ids") || [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const permissionsData = await fetchPermissionAPI();
                setPermissions(permissionsData);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };
        fetchData();

        // Only set default values when `data` exists (update mode)
        if (data?.permissions) {
            const preselectedPermissionIds = data.permissions.map((permission: any) => permission.permission_id);
            setValue("permission_ids", preselectedPermissionIds);
            // setValue("permission_ids", Array.isArray(data.permission_id) ? data.permission_id : [data.permission_id]);
        }

    }, []);

    const handleCheckboxChange = (permissionId: number, isChecked: boolean) => {
        setValue(
            "permission_ids",
            isChecked
                ? [...selectedPermissions, permissionId]
                : selectedPermissions.filter((id: number) => id !== permissionId)
        );
    };

    return (
        <div className="bg-white p-4">
            <h6>Select Permissions:</h6>
            <div className="row row-cols-lg-4 g-2">
                {permissions.map((permission) => (
                    <div key={permission.permission_id} className="col-md-4 col-sm-6 col-12 mb-2">
                        <input
                            type="checkbox"
                            id={`permission-${permission.permission_id}`}
                            className="form-check-input"
                            checked={selectedPermissions.includes(permission.permission_id)}
                            onChange={(e) => handleCheckboxChange(permission.permission_id, e.target.checked)}
                        />
                        <label
                            htmlFor={`permission-${permission.permission_id}`}
                            className="form-check-label text-gray-700 ms-2"
                        >
                            {permission.permission_name}
                        </label>
                    </div>
                ))}
            </div>
            {errors.permission_ids?.message && <p className="text-danger mt-2">{String(errors.permission_ids.message)}</p>}
        </div>
    );
};

export default PermissionForm;
