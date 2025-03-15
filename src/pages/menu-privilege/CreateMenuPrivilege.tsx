import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import MenuPrivilegeForm from "../../components/forms/menu-access/menuPrivilegeForm";

const CreateMenuPrivilegePage = () => {

    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Add menu Access" link="/menu-privilege" />
            </div>

            <div>
                <MenuPrivilegeForm />
            </div>
        </div>
    );
};
export default CreateMenuPrivilegePage;
