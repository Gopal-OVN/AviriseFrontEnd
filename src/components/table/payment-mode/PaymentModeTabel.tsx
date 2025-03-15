import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePaymentModeAPI } from "../../../services/paymentMode-service";
import { PaymentModeDataType } from "../../../types";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: PaymentModeDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const PaymentModeTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-payment-mode", {
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
      const result = await deletePaymentModeAPI(selectedPaymentId);
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

  // const sortedTableData = [...tableData].sort((a, b) =>
  //   (a.payment_name ?? "").localeCompare(b.payment_name ?? "")
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
            <th>Description</th>
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
                {/* <td>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td> */}
                {/* <td>{item.payment_id}</td> */}
                <td>{index + 1}</td>
                <td>{item.payment_name}</td>
                <td>{item.description}</td>
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
                  idKey="payment_id"
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
                    <button onClick={() => confirmDelete(item.payment_id)}>
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

export default PaymentModeTable;
