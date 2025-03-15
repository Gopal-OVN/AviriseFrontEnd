import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";

import CompanyForm from "../../components/forms/company/Company-form";

const EditCompanyPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Company" link="/companies" />
      </div>

      <div>
        <CompanyForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditCompanyPage;
