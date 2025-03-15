import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import PaymentModeForm from "../../components/forms/Payment-mode/PaymentModeForm";

const EditPaymentMode = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Edit Payment Mode" link="/payment-mode" />
      </div>

      <div>
        <PaymentModeForm data={data} type={type} />
      </div>
    </div>
  );
};
export default EditPaymentMode;
