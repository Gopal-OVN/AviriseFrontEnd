import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { getShipmentStatusAPI } from "../../../services/shipment-status-service";
import { Option } from "../../../types";

const ShipmentStatusDropdown = ({
    setStatus,
    data,
    error,
    type,
}: {
    setStatus?: (status: Option | null) => void;
    data?: any;
    type?: "Create" | "Edit" | "View";
    error?: string;
}) => {
    const [statusList, setStatusList] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
    const darkMode = useAppSelector((state) => state.theme.isDark);

    useEffect(() => {
        const fetchShipmentStatus = async () => {
            try {
                const response = await getShipmentStatusAPI(); // Pass countryId to the API
                setStatusList(
                    response.map(({ shipment_status_id, shipment_status_name }: { shipment_status_id: number; shipment_status_name: string }) => ({
                        value: shipment_status_id,
                        label: shipment_status_name,
                    }))
                );
            } catch (error: any) {
                toast.error(error.message || "Error fetching shipment status");
            }
        };

        fetchShipmentStatus();
    }, []);

    useEffect(() => {
        if (data?.shipment_status_id) {
            const matchedShipmentStatus = statusList.find(
                (shipment: Option) => shipment.value === data.shipment_status_id
            );
            if (matchedShipmentStatus) {
                setSelectedStatus(matchedShipmentStatus);
                // setStatus?.(matchedShipmentStatus); // Update the parent component's service
            }
        }
    }, [type, data, statusList]);

    return (
        <div className="">
            <label className="form-label">
                Update Shipment Status
            </label>
            <Select
                options={statusList}
                value={selectedStatus}
                onChange={(selectedOption: any) => {
                    setSelectedStatus(selectedOption);
                    setStatus?.(selectedOption); // Update the parent component's service
                }}
                placeholder="Select Status"
                isDisabled={type === "View"}
                isClearable={true}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: "transparent",
                        color: darkMode ? "#c4c4c4" : "#222222",
                        fontSize: 14,
                        borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#222323",
                    }),
                }}
            />
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default ShipmentStatusDropdown;


{/* <ShipmentStatusDropdown
    setStatus={(e: any) => setValue("shipment_status_id", e.value)}
    data={data}
    type={type}
    error={errors?.shipment_status_id?.message} /> */}