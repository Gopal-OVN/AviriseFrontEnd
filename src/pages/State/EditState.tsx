import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import StateForm from "../../components/forms/State/StateForm";

const EditState = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit State" link={{
          pathname: "/states-tabs",
          state: { activeTab: "state" },
        }} />
      </div>

      <div>
        <StateForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditState;
