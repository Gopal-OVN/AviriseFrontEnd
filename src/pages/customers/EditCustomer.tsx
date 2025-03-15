import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";

import CreateUserForm from "../../components/forms/users-form/user-form";

const EditCustomerPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Customer" link="/customer" />
      </div>

      <div>
        <CreateUserForm data={data} type={type} link="/customer" />
      </div>
    </div>
  );
};
export default EditCustomerPage;
