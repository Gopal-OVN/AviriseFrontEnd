import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import PaymentModeForm from "../../components/forms/Payment-mode/PaymentModeForm";

const CreatePaymentMode = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Payment Mode" link="/payment-mode" />
      </div>

      <div>
        <PaymentModeForm />
      </div>
    </div>
  );
};
export default CreatePaymentMode;
