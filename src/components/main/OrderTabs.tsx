import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getShipmentStatusAPI } from "../../services/shipment-status-service";
import { toast } from "react-toastify";
import OrderPage from "../../pages/order/OrderPage";
import PendingOrderPage from "../../pages/order/PendingOrderPage";
import IntrancitPage from "../../pages/order/IntrancitOrder";
import DeliveredOrderPage from "../../pages/order/DeliveredOrder";

const ORDER_TABS = [
  "Order Created",
  "Pending Pickup",
  "In Transit",
  "Delivered",
];

const OrderTabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  const { data } = useQuery("ShipmentStatus", async () => {
    try {
      const response = await getShipmentStatusAPI();
      return response;
    } catch (error: any) {
      toast.error(error.message || "Error fetching shipment status");
      return [];
    }
  });

  useEffect(() => {
    if (data?.length) {
      let selectedTab = "";

      if (location.state?.activeTab) {
        // Find the shipment_status_name using the provided ID
        const matchedStatus = data.find(
          (status: any) =>
            status.shipment_status_id === location.state.activeTab ||
            status.shipment_status_name === location.state.activeTab
        );
        selectedTab = matchedStatus?.shipment_status_name || "";
      }

      if (!selectedTab) {
        // Default to the first available tab
        selectedTab =
          ORDER_TABS.find((tab) =>
            data.some((status: any) => status.shipment_status_name === tab)
          ) || data[0]?.shipment_status_name;
      }

      setActiveTab(selectedTab);
    }
  }, [location, data]);

  return (
    <div className="row g-4 city-state-main-content">
      <div className="logistics-tab">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs mb-25">
          {ORDER_TABS.filter((tab) =>
            data?.some((status: any) => status.shipment_status_name === tab)
          ).map((status) => (
            <li className="nav-item" key={status}>
              <button
                className={`nav-link ${activeTab === status ? "active" : ""}`}
                onClick={() => setActiveTab(status)}
              >
                {status}
              </button>
            </li>
          ))}
        </ul>

        {/* Dynamic Component Rendering */}
        <div className="tab-content mt-0" style={{ padding: "0" }}>
          {activeTab === "Order Created" && <OrderPage />}
          {activeTab === "Pending Pickup" && <PendingOrderPage />}
          {activeTab === "In Transit" && <IntrancitPage />}
          {activeTab === "Delivered" && <DeliveredOrderPage />}
        </div>
      </div>
    </div>
  );
};

export default OrderTabs;
