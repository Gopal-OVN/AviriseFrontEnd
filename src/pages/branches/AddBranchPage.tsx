import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import BranchForm from "../../components/forms/branch/branch-form";

const AddBranchPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Branch" link="/branches" />
      </div>

      <div>
        <BranchForm />
      </div>
    </div>
  );
};
export default AddBranchPage;
