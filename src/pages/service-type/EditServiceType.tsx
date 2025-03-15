import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import ServiceTypeForm from "../../components/forms/service-type/ServiceTypeForm";

const EditServiceypePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Service Type" link="/service-type" />
      </div>

      <div>
        <ServiceTypeForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditServiceypePage;
