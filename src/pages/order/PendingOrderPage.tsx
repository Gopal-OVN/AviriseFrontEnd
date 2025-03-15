import { useState } from "react";
// import { allAddressBookData, allDriverHeaderData } from "../../data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import TableFilter from "../../components/filter/TableFilter";
import TableHeader3 from "../../components/header/table-header/tableHeader3";
import PendingOrderTable from "../../components/table/order/pendingOrderTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData } from "../../data/index2";
import useFetchOrders from "../../hooks/useFetchOrders";

const PendingOrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 10;
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const {
    data,
    refetch,
    // setFilters,
    // currentPage,
    // setCurrentPage,
    // dataPerPage,
    // total,
    // pageNumber,
    // setPageamount,
    isLoading,
  } = useFetchOrders("Pending Pickup");

  const filteredData = (data ?? []).filter((data: any) => {
    return (
      data.docket_no?.toString().toLowerCase().includes(searchTerm) ||
      "" ||
      data.sender_address?.pincode?.toString().includes(searchTerm) ||
      "" ||
      data.receiver_address?.pincode?.toString().includes(searchTerm) ||
      ""
    );
  });

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
          <TableHeader3
            tableHeading=""
            tableHeaderData={allDriverHeaderData}
            link="/create-order"
            showShipmentStatus
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <PendingOrderTable
                  tableData={currentData}
                  refresh={refetch}
                  isLoading={isLoading}
                />
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
export default PendingOrderPage;
