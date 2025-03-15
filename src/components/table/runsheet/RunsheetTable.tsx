import { useState } from "react";
import { runsheetType } from "../../../types";

type Props = {
  tableData: runsheetType[];
};

const RunsheetTable = ({ tableData }: Props) => {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    new Array(tableData.length).fill(false)
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Handle selecting all checkboxes
  const handleSelectAll = () => {
    const newCheckedState = !isAllSelected;
    setIsAllSelected(newCheckedState);
    setSelectedItems(new Array(tableData.length).fill(newCheckedState));
  };

  // Handle individual row selection
  const handleRowSelect = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);

    // Check if all items are selected after toggling
    setIsAllSelected(updatedSelectedItems.every((item) => item));
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
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
          </th>
          <th>Shipment ID</th>
          <th>Delivery Location</th>
          <th>Pincode</th>
          <th>Weight</th>
          <th>Packages</th>
          <th>Delivery Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedItems[index]}
                  onChange={() => handleRowSelect(index)}
                />
              </div>
            </td>
            <td>{item.id}</td>
            <td>{item.delivery_location}</td>
            <td>{item.pincode}</td>
            <td>{item.weight}</td>
            <td>{item.packages}</td>
            <td>{item.delivery_status}</td>
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

export default RunsheetTable;
