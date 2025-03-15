import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import ParcelTypeForm from "../../components/forms/parcel-type/parcelTypeForm";

const EditParcelTypeFormPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Parcel Type" link="/parcel-type" />
        {/* this link for only ui purpose */}
      </div>

      <div>
        <ParcelTypeForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditParcelTypeFormPage;