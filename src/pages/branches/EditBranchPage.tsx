import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";

import BranchForm from "../../components/forms/branch/branch-form";

const EditBranchPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Branch" link="/branches" />
      </div>

      <div>
        <BranchForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditBranchPage;
