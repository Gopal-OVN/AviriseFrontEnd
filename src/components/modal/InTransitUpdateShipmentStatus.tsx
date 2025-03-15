import UpdateShipmentStatusForm from "../forms/shipment/UpdateShipmentStatusForm";

type Props = {
    show: boolean;
    closeModal: () => void;
    // orderId: number;
};
const InTransitUpdateShipmentStatusModal = ({ show, closeModal, }: Props) => {
    return (
        <>
            <div
                className={`ar-modal-overlay ${show ? "active" : ""}`}
                role="buttton"
                onClick={closeModal}
            ></div>
            <div className={`voice-call-modal ${show ? "active" : ""}`}>
                <UpdateShipmentStatusForm showUploadField={true} closeModal={closeModal} />

                {/* <FileUploadComponent orderId={orderId}  /> */}
            </div>
        </>
    );
};
export default InTransitUpdateShipmentStatusModal;
