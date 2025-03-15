import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import CreateUserForm from "../../components/forms/users-form/user-form";

const CreateDriverPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Driver" link="/drivers" />
      </div>

      <div>
        <CreateUserForm link="/drivers" defaultRole={3} />
      </div>
    </div>
  );
};
export default CreateDriverPage;
