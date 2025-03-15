import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import VehicleForm from "../../components/forms/VehicleForm";

const CreateVehicle = () => {
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Add Vehicle" link="/vehicle" />
            </div>

            <div>
                <VehicleForm />
            </div>
        </div>
    );
};
export default CreateVehicle;