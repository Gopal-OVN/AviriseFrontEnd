import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import ParcelTypeForm from "../../components/forms/parcel-type/parcelTypeForm";

const CreateParcelTypePage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Parcel Type" link="/parcel-type" />
      </div>

      <div>
        <ParcelTypeForm />
      </div>
    </div>
  );
};
export default CreateParcelTypePage;