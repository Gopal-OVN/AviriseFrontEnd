import React from "react";

type Props = {
    item: any;
    idKey: string;
    handleEditClick: (item: any, type: string) => void;
    confirmDelete: (id: number) => void;
};

const ActionButtons: React.FC<Props> = ({ item, idKey, handleEditClick, confirmDelete }) => {
    // const permissionsString = localStorage.getItem("permissions");
    // const permissions: string[] = permissionsString ? JSON.parse(permissionsString).map((p: string) => p.trim()) : [];

    const permissions = localStorage.getItem("permissions") || "[]";


    return (
        <td>
            <div className="btn-box">
                {permissions.includes("Update") && (
                    <button onClick={() => handleEditClick(item, "Edit")}>
                        <i className="fa-light fa-pen"></i>
                    </button>
                )}

                <button onClick={() => handleEditClick(item, "View")}>
                    <i className="fa-light fa-eye"></i>
                </button>

                {permissions.includes("Delete") && (
                    <button onClick={() => confirmDelete(item[idKey])}>
                        <i className="fa-light fa-trash"></i>
                    </button>
                )}
            </div>
        </td>
    );
};

export default ActionButtons;
