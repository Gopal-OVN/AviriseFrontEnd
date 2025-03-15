import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";

import CreateUserForm from "../../components/forms/users-form/user-form";

const AddNewUserPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add User" link="/users" />
      </div>

      <div>
        <CreateUserForm link="/users" />
      </div>
    </div>
  );
};
export default AddNewUserPage;
