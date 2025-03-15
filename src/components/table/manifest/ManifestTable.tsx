// import { AllCustomerDataType } from "../../types";

import { MainfestDataType } from "../../../types";

type Props = {
  tableData: MainfestDataType[];
};

const ManifestTable = ({ tableData }: Props) => {
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
          <th>Shipment ID</th>
          <th>Destination</th>
          <th>Weight</th>
          <th>Packages</th>
          <th>Dimensions</th>
          <th>Status</th>

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

            <td>{item.id}</td>
            <td>{item.destination}</td>
            <td>{item.weight}</td>

            <td>{item.packages}</td>
            <td>{item.dimensions}</td>
            <td>{item.status}</td>

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
export default ManifestTable;
