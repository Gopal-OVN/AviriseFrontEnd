"use client";

export default function ShippingDetailsForm() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          {/* Shipping Details */}

          <div className="panel-header">
            <h5>Shipping Details</h5>
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="awb-number">
              AWB Number:
            </label>
            <input type="text" id="awb-number" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="account-number">
              Account Number:
            </label>
            <input type="text" id="account-number" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="service-type">
              Service Type:
            </label>
            <select id="service-type" className="form-control">
              <option value="">Select Service</option>
              <option value="air">Air</option>
              <option value="surface">Surface</option>
              <option value="domestic-move">Domestic Move</option>
              <option value="full-truck">Full Truck</option>
            </select>
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="origin">
              Forwarding:
            </label>
            <input type="text" id="origin" className="form-control" />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="account-number">
              E-Way Bill:
            </label>
            <input type="text" id="account-number" className="form-control" />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="origin">
              Origin:
            </label>
            <input type="text" id="origin" className="form-control" />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="origin">
              Destination:
            </label>
            <input
              type="text"
              id="origin"
              className="form-control"
              placeholder="Enter origin"
            />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="weight">
              Weight:
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              className="form-control"
            />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="pieces">
              Pieces:
            </label>
            <input
              type="text"
              id="pieces"
              name="pieces"
              className="form-control"
            />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="ship-value">
              Ship Value:
            </label>
            <input
              type="text"
              id="ship-value"
              name="ship-value"
              className="form-control"
            />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="invoice-number">
              Invoice Number:
            </label>
            <input
              type="text"
              id="invoice-number"
              name="invoice-number"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
