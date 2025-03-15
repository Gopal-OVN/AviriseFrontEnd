import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";

import CreateVendorForm from "../../components/forms/vendor/vendor-form";

const CreateVendorPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add New Vendor" link="/vendors" />
      </div>

      <div>
        {/* <CreateUserForm /> */}
        <CreateVendorForm />
      </div>
    </div>
  );
};
export default CreateVendorPage;
