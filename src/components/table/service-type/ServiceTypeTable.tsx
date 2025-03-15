import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteServiceTypeAPI } from "../../../services/serviceType-service";
import { ServiceTypeDataType } from "../../../types";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: ServiceTypeDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;


};

const ServiceTypeTable = ({ tableData, refresh, isLoading, }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );


  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-service-type", {
      state: {
        data: item,
        type: type,
      },
    });
  };

  const confirmDelete = (id: any) => {
    setSelectedPaymentId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedPaymentId) return;
    setLoading(true);

    try {
      const result = await deleteServiceTypeAPI(selectedPaymentId);
      refresh();
      setLoading(false);

      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error || "Error deleting item:");
    }
  };

  // const sortedTableData = [...tableData].sort((a, b) =>
  //   (a.name ?? "").localeCompare(b.name ?? "")
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
            <th>#</th>
            <th>Name</th>
            <th>Decription</th>
            <th>Status</th>
            {/* <th>Sender</th> */}
            {/* <th>Recipient</th>
          <th>Service Type</th>
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
            </td> */}
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                {/* <td>{item.supplier}</td>
            <td>{item.destination}</td>
            <td>{item.order_type}</td>
            <td>{item.trip_type}</td> */}
                {/* <td>
              <ActionDropdown shipmentId={item.service_id} />
            </td> */}

                <td>
                  <span
                    className={`d-inline-block rounded-circle ${item.is_active ? "bg-success" : "bg-danger"
                      }`}
                    style={{ width: "15px", height: "15px" }}
                  ></span>
                  <span className="ms-2">
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                </td>


                <ActionButtons
                  item={item}
                  idKey="service_id"

                  handleEditClick={handleEditClick}
                  confirmDelete={confirmDelete}
                />


                {/* {(canUpdate || canDelete) && (
                  <td>
                    <div className="btn-box">

                      {canUpdate && (
                        <button onClick={() => handleEditClick(item, "Edit")}>
                          <i className="fa-light fa-pen"></i>
                        </button>
                      )}

                      {canUpdate && (
                      <button onClick={() => handleEditClick(item, "View")}>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      )}

                      {canDelete && (
                        <button onClick={() => confirmDelete(item.service_id)}>
                          <i className="fa-light fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </td>
                )} */}
              </tr>
            )))}
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

export default ServiceTypeTable;
