import { useNavigate } from "react-router-dom";
import { VehicleDataType } from "../../../types";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import { deleteVehicleAPI } from "../../../services/vehicle";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: VehicleDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const VehicleTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  );

  const vehicleTypeLabels: { [key: string]: string } = {
    CAR: "Car",
    BIKE: "Bike",
    TRUCK: "Truck",
    BUS: "Bus",
    VAN: "Van",
  };

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-vehicle", {
      state: {
        data: item,
        type: type,
      },
    });
  };

  const confirmDelete = (id: any) => {
    setSelectedVehicleId(id);
    setShowDeleteModal(true);
  };
  const handleDelete = async () => {
    if (!selectedVehicleId) return;
    setLoading(true);
    try {
      const result = await deleteVehicleAPI(selectedVehicleId);
      refresh();
      setLoading(false);
      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error || "Error deleting item:");
    }
  };

  // const sortedTableData = [...tableData].sort((a, b) =>
  //     (a.name ?? "").localeCompare(b.name ?? "")
  // );

  return (
    <div>
      <table
        className="table table-dashed table-hover digi-dataTable all-product-table"
        id="allProductTable"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Vehicle Number</th>
            <th>Insurance Validity</th>
            <th>RC Validity</th>
            <th>Vehical Type</th>
            {/* <th>Driver ID</th>
                        <th>Driver Name</th> */}
            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || loading ? (
            <tr>
              <td colSpan={5} className="text-center">
                <span className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </span>
              </td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.vehicle_number}</td>
                <td>
                  {item.insurance_validity
                    ? new Date(item.insurance_validity).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {item.rc_validity
                    ? new Date(item.rc_validity).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {vehicleTypeLabels[item.vehicle_type ?? ""] || "Unknown"}
                </td>
                {/* <td>{item.driver_id}</td>
                                <td>{item.driver_name}</td> */}

                <td>
                  <span
                    className={`d-inline-block rounded-circle ${
                      item.is_active ? "bg-success" : "bg-danger"
                    }`}
                    style={{ width: "15px", height: "15px" }}
                  ></span>
                  <span className="ms-2">
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <ActionButtons
                  item={item}
                  idKey="id"
                  handleEditClick={handleEditClick}
                  confirmDelete={confirmDelete}
                />

                {/* <td>
                                    <div className="btn-box">
                                        <button onClick={() => handleEditClick(item, "Edit")}>
                                            <i className="fa-light fa-pen"></i>
                                        </button>

                                        <button onClick={() => handleEditClick(item, "View")}>
                                            <i className="fa-light fa-eye"></i>
                                        </button>
                                        <button onClick={() => confirmDelete(item.id)}>
                                            <i className="fa-light fa-trash"></i>
                                        </button>


                                    </div>
                                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default VehicleTable;
