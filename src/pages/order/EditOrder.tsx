import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import OrderForm from "../../components/forms/shipment/OrderForm";

const EditOrderPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { data, type } = state || {};
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection
          title="Edit Order"
          link={{
            pathname: "/order-tabs",
            state: { activeTab: "CreatedOrder" },
          }}
        />
      </div>

      <div>
        <OrderForm data={data} type={type} link="/orders" />
      </div>
    </div>
  );
};
export default EditOrderPage;
