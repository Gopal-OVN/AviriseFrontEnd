import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import TableFilter4 from "../../components/filter/TableFilter4";
import TableHeader4 from "../../components/header/table-header/TableHeader4";
import ManifestTable from "../../components/table/manifest/ManifestTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData, mainfestData } from "../../data/index2";
import { FilterOption } from "../../types";

const ManifestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedDestination, setSelectedDestination] =
    useState<FilterOption | null>(null);
  const [selectWeight, setWeight] = useState<FilterOption | null>(null);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = mainfestData.filter((item) => {
    const matchesSearch = searchTerm
      ? item.id.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesPincode = selectedDestination
      ? item.destination === selectedDestination.value
      : true;

    const matchesweight = selectWeight
      ? item.weight === selectWeight.value
      : true;

    return matchesSearch && matchesPincode && matchesweight;
  });

  const dataPerPage = 10;
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const onDestination = (selectedOption: any) => {
    setSelectedDestination(selectedOption);
    setCurrentPage(1); // Reset pagination on filter change
  };

  const handelWeight = (selectedOption: any) => {
    setWeight(selectedOption);
    setCurrentPage(1); // Reset pagination on filter change
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader4
            tableHeading="Manifest"
            tableHeaderData={allDriverHeaderData}
            showVehicle
          />

          <div className="panel-body">
            <TableFilter4
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onDestination={onDestination}
              onWeightChange={handelWeight}
              showWeight
              showDestination
            />
            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <ManifestTable tableData={currentData} />
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

export default ManifestPage;
