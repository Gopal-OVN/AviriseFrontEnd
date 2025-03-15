import { useState } from "react";
import { TableHeaderDataType } from "../../../types";
import AssignDeliveryModal from "../../modal/Runsheet/AssignDeliveryModal";
import AssignVehicleModal from "../../modal/Runsheet/AssignVehicleModal";

type Props = {
  tableHeaderData: TableHeaderDataType[];
  tableHeading: string;
  buttonHeading?: string;
  showAddBtn?: boolean;
  showAddLink?: boolean;
  link?: string;
  showVehicle?: boolean;
  showDelivery?: boolean;
};

const TableHeader4 = ({
  tableHeading,
  showVehicle = false,
  showDelivery = false,
}: Props) => {
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  const openDeliveryModal = () => setShowDeliveryModal(true);
  const closeDeliveryModal = () => setShowDeliveryModal(false);

  const openVehicleModal = () => setShowVehicleModal(true);
  const closeVehicleModal = () => setShowVehicleModal(false);

  return (
    <div className="panel-header">
      <h5>{tableHeading}</h5>

      <div className="btn-box d-flex gap-2">
        <div className="tableSearch" id="tableSearch">
          {/* Future Search Component */}
        </div>

        <div className="btn-box">
          {showDelivery && (
            <button
              className="btn btn-sm btn-primary"
              onClick={openDeliveryModal}
            >
              <i className="fa-light fa-plus me-2"></i>
              <span>Assign Delivery Agents</span>
            </button>
          )}

          {showVehicle && (
            <button
              className="btn btn-sm btn-primary"
              onClick={openVehicleModal}
            >
              <i className="fa-light fa-plus me-2"></i>
              <span>Assign Vehicle & Driver</span>
            </button>
          )}
        </div>
      </div>

      {showDeliveryModal && (
        <AssignDeliveryModal
          show={showDeliveryModal}
          closeModal={closeDeliveryModal}
        />
      )}
      {showVehicleModal && (
        <AssignVehicleModal
          show={showVehicleModal}
          closeModal={closeVehicleModal}
        />
      )}
    </div>
  );
};

export default TableHeader4;
