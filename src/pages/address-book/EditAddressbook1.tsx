import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import AddressBookForm from "../../components/forms/address-book/Addressbook-form";

const EditAddressbook1 = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Address" link="/address-book" />
      </div>

      <div>
        <AddressBookForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditAddressbook1;
