"use client";

export default function CreateCustomerForm() {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="row g-3">
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Vendor Name</label>
            <input type="text" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control " />
          </div>

          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Address </label>
            <input type="text" className="form-control " />
          </div>

          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Password </label>
            <input type="text" className="form-control " />
          </div>

          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Conform Password </label>
            <input type="text" className="form-control " />
          </div>
        </div>
      </div>
    </div>
  );
}
