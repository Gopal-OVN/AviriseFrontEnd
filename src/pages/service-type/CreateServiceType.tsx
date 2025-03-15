import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import ServiceTypeForm from "../../components/forms/service-type/ServiceTypeForm";

const CreateServiceypePage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Service Type" link="/service-type" />
      </div>

      <div>
        <ServiceTypeForm />
      </div>
    </div>
  );
};
export default CreateServiceypePage;
