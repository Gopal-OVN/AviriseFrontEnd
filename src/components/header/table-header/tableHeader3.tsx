import { useState } from "react";
import { TableHeaderDataType } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleAddTaskModalOpen } from "../../../redux/features/addTaskModalSlice";
import { Link } from "react-router-dom";
import AssignVehicleModal from "../../modal/Runsheet/AssignVehicleModal";
import UpdateShipmentStatusModal from "../../modal/UpdateShipmentStatusModal";
import InTransitUpdateShipmentStatusModal from "../../modal/InTransitUpdateShipmentStatus";
import { selectedOrdersAtom } from "../../../redux/orderAtom";
import { useAtom } from "jotai";
import ErrorModal from "../../modal/ErrorModal";

type Props = {
  tableHeaderData: TableHeaderDataType[];
  tableHeading: string;
  buttonHeading?: string;
  showAddBtn?: boolean;
  showAddLink?: boolean;
  link?: string;
  showDownload?: string;
  showShipmentStatus?: boolean;
  showInTransitShipmentStatus?: boolean;
  showAssign?: boolean;
};

const TableHeader3 = ({
  buttonHeading,
  tableHeading,
  showAddBtn,
  showAddLink,
  showShipmentStatus,
  showInTransitShipmentStatus,
  showDownload,
  showAssign,
  link,
}: Props) => {
  const dispatch = useAppDispatch();
  const openAddModal = () => dispatch(toggleAddTaskModalOpen());

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showShipmentStatusModal, setShowShipmentStatusModal] = useState(false);
  const [showIntransit, setInTransit] = useState(false);
  const [selectedOrders] = useAtom(selectedOrdersAtom);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const permissions = localStorage.getItem("permissions") || "[]";

  const openModal = (setter: (value: boolean) => void) => {
    if (!selectedOrders?.length) {
      setShowErrorModal(true);
      return;
    }
    setter(true);
  };

  return (
    <div className="panel-header">
      <h5>{tableHeading}</h5>

      <div className="btn-box d-flex gap-2">
        <div className="tableSearch" id="tableSearch"></div>

        {showAssign && permissions.includes("Create") && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openModal(setShowVehicleModal)}
          >
            <i className="fa-light fa-plus me-2"></i>
            <span>Assign</span>
          </button>
        )}

        {showShipmentStatus && permissions.includes("Create") && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openModal(setShowShipmentStatusModal)}
          >
            <i className="fa-light fa-plus me-2"></i>
            <span>Update Shipment Status</span>
          </button>
        )}

        {showInTransitShipmentStatus && permissions.includes("Create") && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openModal(setInTransit)}
          >
            <i className="fa-light fa-plus me-2"></i>
            <span>Update Shipment Status</span>
          </button>
        )}

        {showAddBtn && permissions.includes("Create") && (
          <button
            className="btn btn-icon btn-sm btn-primary"
            onClick={openAddModal}
          >
            <i className="fa-light fa-plus"> </i>
          </button>
        )}

        {showAddLink && permissions.includes("Create") && (
          <div className="btn-box">
            <Link className="btn btn-sm btn-primary" to={link || ""}>
              <i className="fa-light fa-plus me-2"></i>{" "}
              <span>Add {buttonHeading}</span>
            </Link>
          </div>
        )}

        {showDownload && (
          <button className="btn btn-sm btn-primary">
            <i className="fa-light fa-download me-2"></i>
            <span>Download</span>
          </button>
        )}
      </div>

      {showVehicleModal && (
        <AssignVehicleModal
          show
          closeModal={() => setShowVehicleModal(false)}
        />
      )}
      {showShipmentStatusModal && (
        <UpdateShipmentStatusModal
          show
          closeModal={() => setShowShipmentStatusModal(false)}
        />
      )}
      {showIntransit && (
        <InTransitUpdateShipmentStatusModal
          show
          closeModal={() => setInTransit(false)}
        />
      )}
      {showErrorModal && (
        <ErrorModal
          show
          // message={errorMessage}
          closeModal={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default TableHeader3;
