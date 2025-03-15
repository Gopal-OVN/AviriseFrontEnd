"use client";

export default function PickupInfo() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          {/* Recipient Information */}
          {/* <div className="panel-header">
            <h5> Recipient Information</h5>
          </div> */}

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="service-type">
              Pickup Type:
            </label>
            <select id="service-type" className="form-control">
              <option value="">Select Pickup Type</option>
              <option value="air">Regular</option>
              <option value="surface">Express</option>
              <option value="domestic-move">Scheduled</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="booking-date">
              Pickup Date:
            </label>
            <input type="date" id="booking-date" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="booking-time">
              Pickup Time:
            </label>
            <input type="time" id="booking-time" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}
