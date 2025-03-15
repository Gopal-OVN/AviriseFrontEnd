"use client";

export default function ReciverInfo() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          {/* Sender Information */}

          <div className="panel-header">
            <h5>Receiver Information</h5>
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="sender-company">
              Name:
            </label>
            <input type="text" id="sender-company" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="sender-name">
              Email:
            </label>
            <input type="text" id="sender-name" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="sender-phone">
              Phone:
            </label>
            <input type="text" id="sender-phone" className="form-control" />
          </div>
          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="sender-address">
              Address:
            </label>
            <input id="sender-address" className="form-control"></input>
          </div>

          <div className="col-xxl-3 col-lg-3 col-sm-6">
            <label className="form-label" htmlFor="sender-phone">
              Pincode:
            </label>
            <input type="text" id="sender-phone" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}
