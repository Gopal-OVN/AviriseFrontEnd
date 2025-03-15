import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import StateForm from "../../components/forms/State/StateForm";

const CreateState = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add State" link={{
          pathname: "/states-tabs",
          state: { activeTab: "state" },
        }} />
      </div>

      <div>
        <StateForm />
      </div>
    </div>
  );
};
export default CreateState;
