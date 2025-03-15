"use client";

export default function ShipmentDetails() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          {/* Sender Information */}

          <div className="panel-header">
            <h5> Shipment Details</h5>
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="weight">
              Weight (kg):
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
              Number of Pieces:
            </label>
            <input
              type="text"
              id="pieces"
              name="pieces"
              className="form-control"
            />
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <input
              id="description"
              name="description"
              className="form-control"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
