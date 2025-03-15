import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import TableFilter4 from "../../components/filter/TableFilter4";
import TableHeader4 from "../../components/header/table-header/TableHeader4";
import RunsheetTable from "../../components/table/runsheet/RunsheetTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData, runsheetData } from "../../data/index2";
import { FilterOption } from "../../types";

const RunSheetPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPincode, setPincode] = useState<FilterOption | null>(null);

  const dataPerPage = 10;

  // Function to filter data based on search and selected pincode
  const filteredData = runsheetData.filter((item) => {
    const matchesSearch = searchTerm
      ? item.id.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPincode = selectedPincode
      ? item.pincode === selectedPincode.value
      : true;

    return matchesSearch && matchesPincode;
  });

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination on search
  };

  const handelPincodeChange = (selectedOption: any) => {
    setPincode(selectedOption);
    setCurrentPage(1); // Reset pagination on filter change
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader4
            tableHeading="Delivery"
            tableHeaderData={allDriverHeaderData}
            showDelivery
          />
          <div className="panel-body">
            <TableFilter4
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onPincodeChange={handelPincodeChange}
              showPincode
            />
            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <RunsheetTable tableData={currentData} />
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

export default RunSheetPage;
