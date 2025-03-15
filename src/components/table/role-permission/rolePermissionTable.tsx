import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RolePermissionDataType } from "../../../types";

type Props = {
  tableData: RolePermissionDataType[];
  refresh: () => void;
  isLoading?: boolean;
};

const RolePermissionTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const permissions = localStorage.getItem("permissions") || "[]";
  const [loading, setLoading] = useState(false);

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-role-permission", { state: { data: item, type: type } });
  };

  return (
    <div>
      <table
        className="table table-dashed table-hover digi-dataTable all-product-table"
        id="allProductTable"
      >
        <thead>
          <tr>
            {/* <th>#</th>
                        <th>Role ID</th> */}
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Menu Accesses</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || loading ? (
            <tr>
              <td colSpan={6} className="text-center">
                <span className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </span>
              </td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td>
                <td>{item.role_id}</td> */}
                <td>{item.role_name}</td>
                <td>
                  {item.permissions?.map((perm: any) => (
                    <span
                      key={perm.permission_id}
                      className="badge bg-primary me-1"
                    >
                      {perm.permission_name}
                    </span>
                  )) || "N/A"}
                </td>

                <td
                  className="text-truncate"
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  title={item.menus?.map((menu) => menu.menu_name).join(", ")}
                >
                  <div
                    className="d-inline-block text-truncate"
                    style={{ maxWidth: "100%" }}
                  >
                    {item.menus?.map((menu: any) => (
                      <span
                        key={menu.menu_id}
                        className="badge bg-success me-1"
                      >
                        {menu.menu_name}
                      </span>
                    )) || "N/A"}
                  </div>
                </td>

                <td>
                  <div className="btn-box pe-4">
                    {permissions.includes("Update") && item.role_name !== "SuperAdmin" && (
                      <button onClick={() => handleEditClick(item, "Edit")}>
                        <i className="fa-light fa-pen"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RolePermissionTable;
