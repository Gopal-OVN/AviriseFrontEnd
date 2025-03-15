// import { AllCustomerDataType } from "../../types";

// import { AddressBookDataType } from "../../../types";

type Props = {
  // tableData: AddressBookDataType[];
  tableData: any;
};

const MasterdataTable = ({ tableData }: Props) => {
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
          <th>Company</th>
          <th>Account Code</th>
          <th>Contact Person</th>
          <th>Mobile </th>
          <th>Email</th>

          <th>Address Type</th>

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

            <td>{item.company}</td>
            <td>{item.account_code}</td>
            <td>{item.contact_person}</td>

            <td>{item.phone}</td>
            <td>${item.email}</td>
            <td>${item.address_type}</td>

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
export default MasterdataTable;
