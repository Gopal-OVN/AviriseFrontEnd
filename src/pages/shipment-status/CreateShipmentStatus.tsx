import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import ShipmentStatusForm from "../../components/forms/shipment-status/shipmentStatusForm";


const CreateShipmentStatusForm = () => {

    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Add Shipment Status" link="/shipment-status" />
            </div>

            <div>
                <ShipmentStatusForm />
            </div>
        </div>
    );
}


export default CreateShipmentStatusForm;

