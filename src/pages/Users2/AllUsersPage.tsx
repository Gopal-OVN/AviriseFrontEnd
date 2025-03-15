import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import TableFilter from "../../components/filter/TableFilter";
import TableHeader from "../../components/header/table-header/TableHeader";
import UserTable2 from "../../components/table/users/UserTable2";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { AllUserData, allVendorHeaderData } from "../../data/index2";

const AllUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 10;
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtering data based on search term
  const filteredData = AllUserData.filter(
    (customer) =>
      customer.userName.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.role.toLowerCase().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Users"
            tableHeaderData={allVendorHeaderData}
            link="/create-user"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <UserTable2 tableData={currentData} />
              </OverlayScrollbarsComponent>
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={filteredData}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllUsersPage;
