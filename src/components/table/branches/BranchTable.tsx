import { useNavigate } from "react-router-dom";
import { BranchDataType } from "../../../types/branch-dataType";

type Props = {
  tableData: BranchDataType[];
  handleDelete: (id: any) => void;
};
const BranchTable = ({ tableData, handleDelete }: Props) => {
  const navigate = useNavigate();
  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-branch", {
      state: {
        data: item,
        type: type,
      },
    });
  };
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
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Industry Type</th>
          <th>State</th>
          <th>City</th>

          <th>Status</th>

          {/* <th>Address</th> */}
          {/* <th>Rating</th>
          <th>Published</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={item.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <div className="table-product-card">
                <div className="part-img">
                  {/* <img src={item.image} alt="Image" /> */}
                  <p>{index + 1}</p>
                </div>
                {/* <div className="part-txt">
                  <span className="product-name">{item.product_name}</span>
                  <span className="product-category">
                    Category: {item.category}
                  </span>
                </div> */}
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.contact_number}</td>
            <td></td>
            <td></td>
            <td></td>

            <td>
              <span
                className={`${
                  item.globle_status_name === "Active"
                    ? "bg-green"
                    : item.globle_status_name === "Inactive"
                    ? "bg-danger"
                    : ""
                } text-white p-1 rounded`}
              >
                {item.globle_status_name}
              </span>
            </td>

            {/* <td>
              {item.city} {item.state} {item.country} {item.pincode}
            </td> */}
            {/* <td>
              <div className="rating">
                <div className="star">
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="rating-amount mt-2">({item.rating})</div>
              </div>
            </td> */}
            {/* <td>{item.published} 01:05 PM</td> */}
            <td>
              <div className="btn-box">
                <button onClick={() => handleEditClick(item, "Edit")}>
                  <i className="fa-light fa-pen"></i>
                </button>

                <button onClick={() => handleEditClick(item, "View")}>
                  <i className="fa-light fa-eye"></i>
                </button>
                <button onClick={() => handleDelete(item.id)}>
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
export default BranchTable;
