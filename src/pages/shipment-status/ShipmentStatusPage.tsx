import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getShipmentStatusAPI } from "../../services/shipment-status-service";
import TableHeader from "../../components/header/table-header/TableHeader";
import { allDriverHeaderData } from "../../data/index2";
import TableFilter from "../../components/filter/TableFilter";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ShipmentStatusTable from "../../components/table/shipment-status/ShipmentStatusTable";

const ShipmentStatusPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dataPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const { data, refetch, isLoading, isError } = useQuery(
    "ShipmentStatus",
    async () => {
      try {
        const response = await getShipmentStatusAPI();

        return response;
      } catch (error: any) {
        toast.error(error.message || "Error fetching shipment status");
      }
    }
  );

  if (isError) return <p>Error fetching shipment status.</p>;

  const filteredData = (data ?? []).filter(
    (data: any) =>
      (data.name?.toLowerCase() || "").includes(searchTerm) ||
      (data.description?.toLowerCase() || "").includes(searchTerm)
  );

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
            tableHeading="All Shipment Status"
            tableHeaderData={allDriverHeaderData}
            link="/create-shipment-status"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <ShipmentStatusTable
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

export default ShipmentStatusPage;
