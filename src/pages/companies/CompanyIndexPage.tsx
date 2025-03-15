import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import TableFilter3 from "../../components/filter/TableFilter3";
import TableHeader from "../../components/header/table-header/TableHeader";
import CompanyTable from "../../components/table/company/CompanyTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { fetchCompaniesAPI } from "../../services/company-service";
import { FilterDataType } from "../../types/company-dataType";

const CompanyIndexPage = () => {
  const [filters, setFilters] = useState<FilterDataType>({
    name: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2); // Default page size
  const [total, setTotal] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageamount, setPageamount] = useState(5);

  // Use useQuery to fetch users
  const { data, refetch } = useQuery(
    ["users", filters, currentPage, pageamount],
    async () => {
      try {
        const response = await fetchCompaniesAPI(
          currentPage, // page
          pageamount, // dynamic page size
          filters.name, // name
          filters.email // email
        );
        setTotal(response.total);
        setDataPerPage(response.page_size);
        setPageNumber(response.page);

        return response.companies;
      } catch (error: any) {
        toast.error(error || "Error fetching users");
        throw error;
      }
    }
  );

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = total ? Math.ceil(total / dataPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleFilter = (filterData: FilterDataType) => {
    setFilters(filterData);
    refetch();
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Companies"
            buttonHeading="Company"
            tableHeaderData={data || []}
            link="/add-company"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter3
              onFilter={handleFilter} // Pass the updated handleFilter
              onPageSizeChange={setPageamount}
              refresh={refetch}
            />

            <div className="table-responsive">
              <CompanyTable tableData={data || []} fetchCompany={refetch} />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={pageNumber * dataPerPage}
              dataList={data || []}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIndexPage;
