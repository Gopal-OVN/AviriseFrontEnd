import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import RolePermissionForm from "../../components/forms/permission/rolePermissionForm";

const EditRolePermissionPage = () => {
    const location = useLocation();
    const { state } = location || {};
    const { data, type } = state || {};
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Edit Permission" link="/role-permission" />
            </div>

            <div>
                <RolePermissionForm data={data} type={type} />
            </div>
        </div>
    );
};
export default EditRolePermissionPage;
