import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import CompanyForm from "../../components/forms/company/Company-form";

const AddCompanyPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Company" link="/companies" />
      </div>

      <div>
        <CompanyForm />
      </div>
    </div>
  );
};
export default AddCompanyPage;
