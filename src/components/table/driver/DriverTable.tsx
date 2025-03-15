import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserAPI } from "../../../services/user-service";
import { UserDataType } from "../../../types/user-dataType";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: UserDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const DriverTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-driver", {
      state: {
        data: item,
        type: type,
      },
    });
  };

  const confirmDelete = (id: any) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const result = await deleteUserAPI(selectedUserId);
      refresh();
      setLoading(false);
      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error || "Error deleting item:");
    }
  };

  // const sortedTableData = [...tableData].sort((a, b) =>
  //   (a.first_name ?? "").localeCompare(b.first_name ?? "")
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

            <th>Email</th>
            <th>Phone</th>
            <th>Lisence No</th>
            <th>Role</th>
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
                <td>{item.first_name}</td>
                <td>{item.email}</td>
                <td>{item.phone_number}</td>
                <td>{item.license_no}</td>
                <td>{item.role_name}</td>

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
                  idKey="user_id"
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
                    <button onClick={() => confirmDelete(item.user_id)}>
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

export default DriverTable;
