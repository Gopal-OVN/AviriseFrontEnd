import UpdateShipmentStatusForm from "../forms/shipment/UpdateShipmentStatusForm";

type Props = {
    show: boolean;
    closeModal: () => void;
};
const UpdateShipmentStatusModal = ({ show, closeModal }: Props) => {
    return (
        <>
            <div
                className={`ar-modal-overlay ${show ? "active" : ""}`}
                role="buttton"
                onClick={closeModal}
            ></div>
            <div className={`voice-call-modal ${show ? "active" : ""}`}>

                <UpdateShipmentStatusForm closeModal={closeModal} />
            </div>
        </>
    );
};
export default UpdateShipmentStatusModal;
