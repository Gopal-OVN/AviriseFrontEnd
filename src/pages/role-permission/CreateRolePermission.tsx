import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import RolePermissionForm from "../../components/forms/permission/rolePermissionForm";

const CreateRolePermissionPage = () => {
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Add Permission" link="/role-permission" />
            </div>

            <div>
                <RolePermissionForm />
            </div>
        </div>
    );
};
export default CreateRolePermissionPage;
