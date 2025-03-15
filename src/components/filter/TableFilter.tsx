const TableFilter = ({ searchTerm, onSearchChange }: any) => {
  return (
    <div className="table-filter-option">
      <div className="row g-3">
        <div className="col-12 col-sm-8">
          <form className="row g-2">
            {/* <BulkActions /> */}


            <div className="col-4">
              <form action="#" method="get" className="position-relative">
                <input
                  type="search"
                  className="form-control ps-5 pe-5"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={onSearchChange}
                  style={{ paddingLeft: "2.5rem" }} // Adjust padding for the icon
                />
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <circle
                      cx="6.36364"
                      cy="6.36364"
                      r="5.66364"
                      stroke="black"
                      strokeWidth="1.4"
                    />
                    <line
                      x1="13.0101"
                      y1="14"
                      x2="10.1818"
                      y2="11.1718"
                      stroke="black"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </form>
            </div>


            <div className="col-3 col-sm-4 col-lg-3 col-xl-2">
              {/* <button className="btn btn-primary w-100">Apply</button> */}
            </div>
          </form>
        </div>
        {/* <div className="col-12 col-sm-4 d-flex justify-content-end">
          <div id="employeeTableLength">
            <label className="d-flex align-items-center gap-2">
              <EmployeeLength2 />
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default TableFilter;
