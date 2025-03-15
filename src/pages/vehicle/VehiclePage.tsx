import { useState } from "react";
import { getVehicleAPI } from "../../services/vehicle";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import TableHeader from "../../components/header/table-header/TableHeader";
import { allDriverHeaderData } from "../../data/index2";
import TableFilter from "../../components/filter/TableFilter";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import TableBottomControls from "../../components/utils/TableBottomControls";
import VehicleTable from "../../components/table/vehicle/VehicleTable";

const VehiclePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const { data, refetch, isLoading, isError } = useQuery(
    "Vehicle",
    async () => {
      try {
        const response = await getVehicleAPI();

        return response;
      } catch (error: any) {
        toast.error(error.message || "Error fetching vehicles");
      }
    }
  );

  if (isError) return <p>Error fetching vehicles.</p>;

  const filteredData = (data ?? []).filter(
    (data: any) =>
      (data.name?.toLowerCase() || "").includes(searchTerm) ||
      (data.vehicle_number?.toLowerCase() || "").includes(searchTerm)
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
            tableHeading="All vehicles"
            tableHeaderData={allDriverHeaderData}
            link="/create-vehicle"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <VehicleTable
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

export default VehiclePage;
