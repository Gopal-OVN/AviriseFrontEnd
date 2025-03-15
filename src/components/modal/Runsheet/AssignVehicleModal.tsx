import DriverAssignForm from "../../forms/shipment/DriverVehicleForm";
// import VehicleForm from "../../forms/VehicleForm";

type Props = {
  show: boolean;
  closeModal: () => void;
};
const AssignVehicleModal = ({ show, closeModal }: Props) => {
  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="buttton"
        onClick={closeModal}
      ></div>
      <div className={`voice-call-modal  ${show ? "active" : ""}`}>
        {/* <VehicleForm /> */}
        <DriverAssignForm closeModal={closeModal} />
      </div>
    </>
  );
};
export default AssignVehicleModal;
