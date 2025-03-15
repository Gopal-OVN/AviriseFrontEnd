import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import MenuPrivilegeForm from "../../components/forms/menu-access/menuPrivilegeForm";

const EditMenuPrivilegePage = () => {
    const location = useLocation();
    const { state } = location || {};
    const { data, type } = state || {};
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Edit Menu Access" link="/menu-privilege" />
            </div>

            <div>
                <MenuPrivilegeForm data={data} type={type} />
            </div>
        </div>
    );
};
export default EditMenuPrivilegePage;
