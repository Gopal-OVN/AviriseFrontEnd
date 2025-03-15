type Props = {
  tableData: any;
  refresh: (parent?: any) => void;
  onSelectAddress: (selected: any) => void;
  handleClose: () => void;
};

const AddressbookTable2 = ({
  tableData,
  onSelectAddress,
  handleClose,
}: Props) => {
  const handleSelect = (item: any) => {
    onSelectAddress(item);
    handleClose();
  };

  return (
    <div>
      <table
        className="table table-dashed table-hover digi-dataTable all-product-table"
        id="allProductTable"
      >
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact Name</th>
            <th>State</th>
            <th>City</th>
            <th>Status</th>

            {/* <th>Pin Code</th>
            <th>Status</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: any) => (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td>{item.company_name}</td>
              <td>{item.contact_name}</td>
              <td>{item.state_name}</td>
              <td>{item.city_name}</td>

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

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelect(item)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressbookTable2;
