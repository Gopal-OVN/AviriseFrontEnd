import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import CityForm from "../../components/forms/city/CityForm";

const CreateCity = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add City" link={{
          pathname: "/states-tabs",
          state: { activeTab: "city" },
        }} />
      </div>

      <div>
        <CityForm />
      </div>
    </div>
  );
};
export default CreateCity;
