import { useEffect, useState } from "react";
import CityPage from "../../pages/City/CityPage";
import StatePage from "../../pages/State/StatePage";
import { useLocation } from "react-router-dom";

const StateTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("state");
  const toggleTab = (tab: string) => setActiveTab(tab);

  const location = useLocation();

  useEffect(() => {
    // Check if the location state contains the activeTab value
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  return (
    <div className="row g-4 city-state-main-content">
      <div className="logistics-tab">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "state" ? "active" : ""}`}
              onClick={() => toggleTab("state")}
            >
              State
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "city" ? "active" : ""}`}
              onClick={() => toggleTab("city")}
            >
              City
            </button>
          </li>
        </ul>

        <div className="tab-content mt-0" style={{ padding: "0" }}>
          <div
            className={`ar-tab-pane ${activeTab === "city" ? "active" : ""}`}
          >
            <CityPage />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "state" ? "active" : ""}`}
          >
            <StatePage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateTabs;
