import React, { useEffect } from "react";

type ErrorModalProps = {
  show: boolean;

  closeModal: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  show,
  closeModal,
}) => {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        closeModal();
      }, 4000); // 4 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or when `show` changes
    }
  }, [show, closeModal]);

  if (!show) return null;

  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="buttton"
        onClick={closeModal}
      ></div>

      <div className={`voice-call-modal ${show ? "active" : ""} w-auto p-2`}>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-sm btn-icon "
            onClick={closeModal}
          >
            <i className="fa-light fa-times "></i>
          </button>
        </div>
        <div className=" p-1 ">

          <h6 className="text-danger ms-2">Select at least one order to assign!</h6>

        </div>

      </div>
    </>
  );
};

export default ErrorModal;
