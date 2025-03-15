import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import OrderForm from "../../components/forms/shipment/OrderForm";

const CreateOrderPage = () => {
  return (
    <div className="row g-4 add-product-page">
      <div className="col-12">
        <BreadcrumbSection title="Add Order" link="/order-tabs" />
      </div>

      <div >
        <OrderForm />
      </div>
    </div>
  );
};
export default CreateOrderPage;
