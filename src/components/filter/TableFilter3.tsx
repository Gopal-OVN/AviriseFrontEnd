import { useEffect, useRef, useState } from "react";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";
import RolesType from "../utils/dropdowns/RolesType";
import { FilterDataType } from "../../types/company-dataType";

type Props = {
  showRole?: boolean;
  onFilter: (filters: FilterDataType) => void;
  onPageSizeChange: (pageSize: number) => void;
  refresh: (parent?: any) => void; // Update to accept an optional parent argument
};

const TableFilter3 = ({
  showRole,
  onFilter,
  onPageSizeChange,
  refresh,
}: Props) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, any>>({
    name: "",
    email: "",
    roleId: null,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePageSizeChange = (size: number) => onPageSizeChange(size);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleFilters = () => setIsFilterVisible((state) => !state);

  const handleSearch = () => onFilter(filters);

  const resetFilters = () => {
    setFilters({
      name: "",
      email: "",
      roleId: null,
    });
    setIsFilterVisible(false);
    onFilter({ name: "", email: "", roleId: 0 }); // Reset filters in parent
    refresh(null); // Pass null to the refresh function
  };

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="table-filter-option" id="tableFilter-2">
      <div className="row g-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="position-relative">
            <i
              className="fa-light fa-search position-absolute top-50 start-0 translate-middle-y ms-2"
              style={{ pointerEvents: "none" }}
            ></i>
            <input
              type="search"
              className="form-control ps-5 pe-5"
              placeholder="Filter...."
              aria-controls="targetAudienceTable"
              onFocus={toggleFilters}
            />
            <i
              className="fa-light fa-chevron-down position-absolute top-50 end-0 translate-middle-y me-2"
              style={{ pointerEvents: "none" }}
            ></i>
          </div>
          <div
            id="employeeTableLength"
            className="col-12 col-lg-3 col-xl-2 d-flex justify-content-end"
          >
            <label className="d-flex align-items-center gap-2">
              <EmployeeLength onPageSizeChange={handlePageSizeChange} />
            </label>
          </div>
        </div>
        {isFilterVisible && (
          <div ref={dropdownRef} className="filter-dropdown mt-3">
            <div className="row g-3">
              <div className="col btn-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={filters.name}
                  onChange={(e) => updateFilter("name", e.target.value)}
                />
              </div>
              <div className="col btn-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={filters.email}
                  onChange={(e) => updateFilter("email", e.target.value)}
                />
              </div>
              {showRole && (
                <div className="col">
                  <RolesType
                    onRoleChange={(roleId) => updateFilter("roleId", roleId)}
                  />
                </div>
              )}
            </div>
            <div className="d-flex gap-4 mt-4">
              <div className="btn-box border">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={resetFilters}
                >
                  Cancel
                </button>
              </div>
              <button
                type="button"
                className="w-full @xl:w-auto btn btn-sm btn-primary"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFilter3;
