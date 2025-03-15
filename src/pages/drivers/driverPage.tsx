import TableFilter3 from "../../components/filter/TableFilter3";
import TableHeader from "../../components/header/table-header/TableHeader";
import DriverTable from "../../components/table/driver/DriverTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import useFetchUsers from "../../hooks/useFetchUsers";

const DriverPage = () => {
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
  } = useFetchUsers("driver");

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
            tableHeading="All Drivers"
            buttonHeading="Driver"
            tableHeaderData={data || []}
            link="/create-driver"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter3
              onFilter={handleFilter}
              onPageSizeChange={setPageamount}
              showRole
              refresh={refetch}
            />

            <div className="table-responsive">
              {/* <UserTable tableData={data || []} fetchUsers={refetch} /> */}

              <DriverTable tableData={data || []} refresh={refetch} />
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

export default DriverPage;
