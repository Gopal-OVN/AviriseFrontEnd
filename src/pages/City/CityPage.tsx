import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import TableFilter from "../../components/filter/TableFilter";
import TableHeader from "../../components/header/table-header/TableHeader";
import CityTable from "../../components/table/City/CityTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData } from "../../data/index2";
import { fetchCityAPI } from "../../services/city-service";

const CityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const { data, refetch, isLoading, isError } = useQuery(
    "CityQuery",
    async () => {
      try {
        const response = await fetchCityAPI();
        console.log("state", response);

        return response.cities;
      } catch (error: any) {
        toast.error(error.message || "Error fetching service types");
      }
    }
  );

  // if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching service types.</p>;

  const filteredData = (data ?? []).filter(
    (serviceType: any) =>
      (serviceType.name?.toLowerCase() || "").includes(searchTerm) ||
      (serviceType.description?.toLowerCase() || "").includes(searchTerm)
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
            tableHeading="All City"
            tableHeaderData={allDriverHeaderData}
            link="/create-city"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <CityTable
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

export default CityPage;
