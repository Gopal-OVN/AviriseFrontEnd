// import { AllCustomerDataType } from "../../types";

import { PickupRequestDataType } from "../../../types";

type Props = {
  tableData: PickupRequestDataType[];
};

const PickupRequestTable = ({ tableData }: Props) => {
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
          <th>Pickup Type</th>
          <th>Pickup Date</th>
          <th>Sender</th>
          <th>Receiver </th>
          <th>Weight</th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>

            <td>{item.pickup_type}</td>
            <td>{item.pickup_date}</td>
            <td>{item.sender}</td>

            <td>{item.receiver}</td>
            <td>{item.weight}</td>

            {/* <td>{item.postalCode}</td> */}

            <td>
              <div className="btn-box">
                <button>
                  <i className="fa-light fa-eye"></i>
                </button>
                <button>
                  <i className="fa-light fa-pen"></i>
                </button>
                <button>
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
export default PickupRequestTable;
