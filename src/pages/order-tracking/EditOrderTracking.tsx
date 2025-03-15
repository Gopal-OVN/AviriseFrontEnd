import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import OrderTrackingForm from "../../components/forms/order-tracking/orderTrackingForm";

const EditOrderTrackingForm = () => {

    const location = useLocation();
    const { state } = location || {};
    const { data, type } = state || {};
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Edit Shipment Statue" link="/order-tracking" />
                {/* this link for only ui purpose */}
            </div>

            <div>
                <OrderTrackingForm data={data} type={type} />
            </div>
        </div>
    );
}



export default EditOrderTrackingForm;

