import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteStateAPI } from "../../../services/country-service";
import { StateDataType } from "../../../types";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: StateDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const StateTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-state", {
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
      const result = await deleteStateAPI(selectedPaymentId);
      refresh();
      setLoading(false);
      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting item");
    } finally {
      setShowDeleteModal(false);
      setSelectedPaymentId(null);
    }
  };

  const sortedTableData = [...tableData].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );

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
            <th>Code</th>
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
            sortedTableData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.state_code}</td>
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

export default StateTable;
