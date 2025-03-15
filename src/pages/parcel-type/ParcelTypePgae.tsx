import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import TableFilter from "../../components/filter/TableFilter";
import TableHeader from "../../components/header/table-header/TableHeader";
import ParcelTypeTable from "../../components/table/parcel-type/ParcelTypetable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData } from "../../data/index2";
import { getParcelTypeAPI } from "../../services/parcelType-service";

const ParcelTypePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const { data, refetch, isLoading, isError } = useQuery(
    "ParcelTypes",
    async () => {
      try {
        const response = await getParcelTypeAPI();

        return response;
      } catch (error: any) {
        toast.error(error.message || "Error fetching parcel types");
      }
    }
  );

  // if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching parcel types.</p>;

  const filteredData = (data ?? []).filter(
    (data: any) =>
      (data.parcel_name?.toLowerCase() || "").includes(searchTerm) ||
      (data.description?.toLowerCase() || "").includes(searchTerm)
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
            tableHeading="All Parcel Types"
            tableHeaderData={allDriverHeaderData}
            link="/create-parcel-type"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <ParcelTypeTable
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

export default ParcelTypePage;
