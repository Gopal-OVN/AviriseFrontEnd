import { useNavigate } from "react-router-dom";
import { ParcelTypeDataType } from "../../../types";
import { deleteParcelTypeAPI } from "../../../services/parcelType-service";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import { useState } from "react";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: ParcelTypeDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const ParcelTypeTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<number | null>(null);

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-parcel-type", {
      state: {
        data: item,
        type: type,
      },
    });
  };

  const confirmDelete = (id: any) => {
    setSelectedParcelId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedParcelId) return;
    setLoading(true);
    try {
      const result = await deleteParcelTypeAPI(selectedParcelId);
      refresh();
      setLoading(false);
      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error || "Error deleting item:");
    }
  };

  // const sortedTableData = [...tableData].sort((a, b) =>
  //   (a.parcel_name ?? "").localeCompare(b.parcel_name ?? "")
  // );

  return (
    <div>
      <table
        className="table table-dashed table-hover digi-dataTable all-product-table"
        id="allProductTable"
      >
        <thead>
          <tr>
            {/* <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllProduct"
              />
            </div>
          </th> */}
            {/* <th>Parcel Type ID</th> */}
            <th>#</th>
            <th>Name</th>
            <th>Decription</th>
            <th>Status</th>
            {/* <th>Sender</th> */}
            {/* <th>Recipient</th>
          <th>Parcel Type</th>
          <th>Shipment Status</th> */}
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
                {/* <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>{item.parcel_id}</td> */}
                <td>{index + 1}</td>
                <td>{item.parcel_name}</td>
                <td>{item.description}</td>
                {/* <td>{item.supplier}</td>
            <td>{item.destination}</td>
            <td>{item.order_type}</td>
            <td>{item.trip_type}</td> */}
                {/* <td>
              <ActionDropdown shipmentId={item.parcel_id} />
            </td> */}

                {/* <td>{item.is_active ? "Active  " : " Inactive"}</td> */}

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
                  idKey="parcel_id"
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
                    <button onClick={() => confirmDelete(item.parcel_id)}>
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

export default ParcelTypeTable;
