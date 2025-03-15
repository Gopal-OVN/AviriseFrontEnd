type Props = {
  tableData: any;
};

const UserTable2 = ({ tableData }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable all-product-table"
      id="allProductTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllProduct"
              />
            </div>
          </th>
          <th> Name</th>

          <th>User Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Additional Info</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item: any, index: any) => (
          <tr key={index}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.userName}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.role}</td>

            {/* Render different additional details based on role */}
            <td>
              {item.role === "Customer" && (
                <>
                  Orders: {item.orders || 0}, Spent: ${item.totalSpent || 0}
                </>
              )}
              {item.role === "Vendor" && (
                <>Business: {item.business_name || "N/A"}</>
              )}
              {item.role === "Driver" && (
                <>
                  Mission: {item.mission_type || "N/A"}, Vehicle:{" "}
                  {item.vehicle_type || "N/A"}
                </>
              )}
            </td>

            <td>
              <div className="btn-box">
                <button title="View">
                  <i className="fa-light fa-eye"></i>
                </button>
                <button title="Edit">
                  <i className="fa-light fa-pen"></i>
                </button>
                <button title="Delete">
                  <i className="fa-light fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable2;
