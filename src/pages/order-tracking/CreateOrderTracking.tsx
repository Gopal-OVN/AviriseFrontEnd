import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import OrderTrackingForm from "../../components/forms/order-tracking/orderTrackingForm";


const CreateOrderTrackingForm = () => {

    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Add Shipment Status" link="/order-tracking" />
            </div>

            <div>
                <OrderTrackingForm />
            </div>
        </div>
    );
}


export default CreateOrderTrackingForm;

