"use client";

export default function AssignDeliveryForm() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          {/* Assign Delivery Agent*/}

          <div className="mb-4">
            <h5>Assign Delivery Agent</h5>
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="service-type">
              Select Delivery Agent:
            </label>
            <select id="service-type" className="form-control">
              <option value="">Select Agent</option>
              <option value="air">Agent 1</option>
              <option value="surface">Agent 2</option>
              <option value="domestic-move">Agent 3 </option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="service-type">
              Vehicle Type:
            </label>
            <select id="service-type" className="form-control">
              <option value="">Select Vehicle Type</option>
              <option value="air">Bike</option>
              <option value="surface">Van</option>
              <option value="domestic-move">Truck</option>
              <option value="full-truck">Full Truck</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="origin">
              Delivery Route:
            </label>
            <input type="text" id="origin" className="form-control" />
          </div>

          <div className="col-12 text-end gp-16">
            <button type="submit" className="btn btn-primary">
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
