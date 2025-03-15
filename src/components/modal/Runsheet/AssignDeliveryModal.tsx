import AssignDeliveryForm from "../../forms/runsheet-form/AssignDeliveryForm";

type Props = {
  show: boolean;
  closeModal: () => void;
};
const AssignDeliveryModal = ({ show, closeModal }: Props) => {
  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="buttton"
        onClick={closeModal}
      ></div>
      <div className={`voice-call-modal ${show ? "active" : ""}`}>
        <AssignDeliveryForm />
      </div>
    </>
  );
};
export default AssignDeliveryModal;
