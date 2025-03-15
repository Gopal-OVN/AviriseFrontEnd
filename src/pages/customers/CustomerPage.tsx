import TableFilter3 from "../../components/filter/TableFilter3";
import TableHeader from "../../components/header/table-header/TableHeader";
import CustomerTable from "../../components/table/customer/customerTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import useFetchUsers from "../../hooks/useFetchUsers";

const CustomerPage2 = () => {
  const {
    data,
    refetch,
    setFilters,
    currentPage,
    setCurrentPage,
    dataPerPage,
    total,
    pageNumber,
    setPageamount,
  } = useFetchUsers("customer");

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const totalPages = total ? Math.ceil(total / dataPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleFilter = (filterData: any) => {
    setFilters(filterData);
    refetch();
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Customers"
            buttonHeading="Customer"
            tableHeaderData={data || []}
            link="/create-customer"
            showAddLink
            showCompany
            showBranch
          />

          <div className="panel-body">
            <TableFilter3
              onFilter={handleFilter}
              onPageSizeChange={setPageamount}
              showRole
              refresh={refetch}
            />

            <div className="table-responsive">
              {/* <UserTable tableData={data || []} refresh={refetch} /> */}
              <CustomerTable tableData={data || []} refresh={refetch} />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={pageNumber * dataPerPage}
              dataList={data || []}
              currentPage={currentPage}
              totalPages={total}
              paginate={paginate}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage2;
