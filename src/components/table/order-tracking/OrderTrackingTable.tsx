import { useNavigate } from "react-router-dom";
import { OrderTrackingDataType } from "../../../types";
import { useState } from "react";
import { deleteShipmentStatusAPI } from "../../../services/shipment-status-service";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";

type Props = {
  tableData: OrderTrackingDataType[];
  refresh: (parent?: any) => void;
  isLoading?: boolean;
};

const OrderTrackingTable = ({ tableData, refresh, isLoading }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  return (
    <div>
      <table
        className="table table-dashed table-hover digi-dataTable all-product-table"
        id="allProductTable"
      >
        <thead>
          <tr>

            <th>OrderId</th>
            <th>Docket</th>
            <th>Order Status</th>
            <th>Comment</th>
            <th>POD</th>

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
            tableData.map((item, index) => (
              <tr key={index}>

                <td>{item.order_id}</td>
                <td>{item.docket}</td>
                <td>{item.shipment_status_name}</td>
                <td>{item.comment}</td>
                <td>{item.pod}</td>


              </tr>
            ))
          )}
        </tbody>
      </table>


    </div>
  );
};

export default OrderTrackingTable;
