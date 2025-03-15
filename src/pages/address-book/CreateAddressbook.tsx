import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import AddressBookForm from "../../components/forms/address-book/Addressbook-form";

const CreateAddressbook = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Address" link="/address-book" />
      </div>

      <div>
        <AddressBookForm />
      </div>
    </div>
  );
};
export default CreateAddressbook;
