import { useLocation } from "react-router-dom";
import BreadcrumbSection from "../../components/breadcrumb/BreadcrumbSection";
import VehicleForm from "../../components/forms/VehicleForm";

const EditVehicle = () => {
    const location = useLocation();
    const { state } = location || {};
    const { data, type } = state || {};
    return (
        <div className="row g-4 add-product-page">
            <div className="col-12">
                <BreadcrumbSection title="Edit Vehicle" link="/vehicle" />
                {/* this link for only ui purpose */}
            </div>

            <div>
                <VehicleForm data={data} type={type} />
            </div>
        </div>
    );
};
export default EditVehicle;