import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import CreateUserForm from "../../components/forms/users-form/user-form";

const CreateCustomerPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Customer" link="/customer" />
      </div>

      <div>
        {/* <CreateCustomerForm /> */}
        <CreateUserForm link="/customer" defaultRole={2} />

        {/* <CreateDriverForm /> */}
      </div>
    </div>
  );
};
export default CreateCustomerPage;
