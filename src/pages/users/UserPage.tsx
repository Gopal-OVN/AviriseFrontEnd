import TableHeader from "../../components/header/table-header/TableHeader";
import TableFilter3 from "../../components/filter/TableFilter3";
import UserTable from "../../components/table/users/UserTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import useFetchUsers from "../../hooks/useFetchUsers";

const UserPage = () => {
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
    isLoading,
  } = useFetchUsers();

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
            tableHeading="All Users"
            buttonHeading="User"
            tableHeaderData={data || []}
            link="/add-user"
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
              <UserTable
                tableData={data || []}
                refresh={refetch}
                isLoading={isLoading}
              />
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

export default UserPage;
