import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import CityForm from "../../components/forms/city/CityForm";

const EditCity = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit City" link={{
          pathname: "/states-tabs",
          state: { activeTab: "city" },
        }} />
      </div>

      <div>
        <CityForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditCity;
