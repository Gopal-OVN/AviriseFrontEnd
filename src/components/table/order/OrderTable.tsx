import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectedOrdersAtom } from "../../../redux/orderAtom";
import { deleteOrderAPI } from "../../../services/order-service";
import { OrderDataType } from "../../../types";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import ActionButtons from "../../role-permissions/action-buttons";

type Props = {
  tableData: OrderDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const OrderTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  // const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom); // Jotai state

  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    setSelectedOrders([]); // Reset selection on mount
    setSelectAll(false);
  }, []);

  const handleEditClick = (item: any, type: any) => {
    navigate("/edit-order", {
      state: {
        data: item,
        type: type,
      },
    });
  };

  const confirmDelete = (id: any) => {
    setSelectedOrderId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedOrderId) return;
    setLoading(true);
    try {
      const result = await deleteOrderAPI(selectedOrderId);
      refresh();
      setLoading(false);
      setShowDeleteModal(false);

      toast.success(result.message || "Delete successful");
    } catch (error: any) {
      toast.error(error || "Error deleting item:");
    }
  };

  // Toggle individual checkbox selection
  const handleCheckboxChange = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(tableData.map((item) => Number(item.order_id))); // Convert to number
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      {loading ? (
        <h6 className="d-flex justify-content-center align-items-center h-100 fw-medium">
          Pdf Generating...
        </h6>
      ) : (
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
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              {/* <th>#</th> */}
              <th>Docket No</th>
              <th>COD Amount</th>
              <th>Payment Type</th>
              <th>Service Type</th>
              <th>Payment Mode</th>
              <th>Customer</th>
              <th>GST Number</th>
              <th>Receiver Company Name</th>
              <th>Sender Company Name</th>
              <th>Parcel Type</th>
              <th>Shipment Value</th>
              <th>Invoice No</th>
              <th>E-Way Bill</th>
              <th>Forwarding</th>
              <th>Booking Instruction</th>


              {/* <th>Status</th> */}
              {/* <th>Reports</th> */}
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
              tableData.map((item) => (
                <tr key={item.order_id}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedOrders.includes(Number(item.order_id))}
                        onChange={() =>
                          handleCheckboxChange(Number(item.order_id))
                        }
                      />
                    </div>
                  </td>
                  {/* <td>{index + 1}</td> */}
                  <td>{item.display_docket ? item.display_docket : "-"}</td>
                  {/* <td>{item.cod_amount}</td> */}
                  <td>{item.cod_amount && item.cod_amount !== 0 ? item.cod_amount : "-"}</td>

                  <td>{item.payment_type ? item.payment_type : "-"}</td>

                  <td>{item.service_type_name ? item.service_type_name : "-"}</td>

                  <td>{item.payment_mode_name ? item.payment_mode_name : "-"}</td>

                  <td>{item.customer_name ? item.customer_name : "-"}</td>

                  <td>{item.gst_number && item.gst_number !== 0 ? item.gst_number : "-"}</td>

                  <td>{item.receiver_company_name ? item.receiver_company_name : "-"}</td>

                  <td>{item.sender_company_name ? item.sender_company_name : "-"}</td>

                  <td>{item.parcel_type_name ? item.parcel_type_name : "-"}</td>

                  <td>{item.shipment_value && item.shipment_value !== 0 ? item.shipment_value : "-"}</td>

                  <td>{item.invoice_no && item.invoice_no !== 0 ? item.invoice_no : "-"}</td>

                  <td>{item.e_way_bill && item.e_way_bill !== 0 ? item.e_way_bill : "-"}</td>

                  <td>{item.forwarding && item.forwarding !== 0 ? item.forwarding : "-"}</td>

                  <td>{item.booking_instruction ? item.booking_instruction : "-"}</td>
                  {/* <td>{item.order_item}</td> */}
                  {/* <td> <ActionDropdown shipmentId={item.order_id} /> </td> */}

                  {/* <td>
                    <span
                      className={`d-inline-block rounded-circle ${item.is_active ? "bg-success" : "bg-danger"
                        }`}
                      style={{ width: "15px", height: "15px" }}
                    ></span>
                    <span className="ms-2">
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td> */}

                  {/* <td>
                    <ReportOption
                      orderId={item.order_id}
                      orderData={item}
                      setLoading={setLoading}
                    />
                  </td> */}

                  {item.shipment_status_name !== "Delivered" && (
                    <ActionButtons
                      item={item}
                      idKey="order_id"
                      handleEditClick={handleEditClick}
                      confirmDelete={confirmDelete}
                    />
                  )}

                  {item.shipment_status_name == "Delivered" && (
                    <div className="btn-box" >
                      <td>{item.pod ? item.pod : "-"}
                        {/* <button>
                          View POD
                        </button> */}
                      </td>
                    </div>
                  )}

                  {/* <td>
                    <div className="btn-box">
                      <button onClick={() => handleEditClick(item, "Edit")}>
                        <i className="fa-light fa-pen"></i>
                      </button>

                      <button onClick={() => handleEditClick(item, "View")}>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      <button onClick={() => confirmDelete(item.order_id)}>
                        <i className="fa-light fa-trash"></i>
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )
      }
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div >
  );
};

export default OrderTable;
