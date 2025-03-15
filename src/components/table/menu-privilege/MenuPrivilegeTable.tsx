import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";
import { MenuPrivilegeDataType } from "../../../types";
import { deleteMenuPrivilegeAPI } from "../../../services/menu-privilege-service";

type Props = {
    tableData: MenuPrivilegeDataType[];
    refresh: (parent?: any) => void;
    isLoading?: boolean;


};

const MenuPrivilegeTable = ({ tableData, refresh, isLoading, }: Props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMenuPrivilegeId, setSelectedMenuPrivilegeId] = useState<number | null>(
        null
    );


    const handleEditClick = (item: any, type: any) => {
        navigate("/edit-menu-privilege", {
            state: {
                data: item,
                type: type,
            },
        });
    };

    const confirmDelete = (id: any) => {
        setSelectedMenuPrivilegeId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedMenuPrivilegeId) return;
        setLoading(true);

        try {
            const result = await deleteMenuPrivilegeAPI(selectedMenuPrivilegeId);
            refresh();
            setLoading(false);

            setShowDeleteModal(false);

            toast.success(result.message || "Delete successful");
        } catch (error: any) {
            toast.error(error || "Error deleting item:");
        }
    };


    return (
        <div>
            <table
                className="table table-dashed table-hover digi-dataTable all-product-table"
                id="allProductTable"
            >
                <thead>
                    <tr>

                        <th>#</th>
                        <th>MenuPrivilege ID</th>
                        <th>Menu Name</th>
                        <th>Menu ID</th>
                        <th>Role ID</th>
                        <th>Role Name</th>
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
                                <td>{item.id}</td>
                                <td>{item.menu_name}</td>
                                <td>{item.menu_id}</td>
                                <td>{item.role_id}</td>
                                <td>{item.role_name}</td>


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
                                    idKey="id"
                                    handleEditClick={handleEditClick}
                                    confirmDelete={confirmDelete}
                                />
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

export default MenuPrivilegeTable;
