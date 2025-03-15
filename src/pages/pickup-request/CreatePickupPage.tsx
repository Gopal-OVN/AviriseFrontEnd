import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import PickUpRequestForm from "../../components/forms/pickup-request/request-form";

const CreateRequestPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add New Request" link="/all-request" />
      </div>

      <div>
        <PickUpRequestForm />
      </div>
    </div>
  );
};
export default CreateRequestPage;
