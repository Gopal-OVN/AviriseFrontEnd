import { useState } from "react";
import TableHeader from "../../components/header/table-header/TableHeader";
// import { allAddressBookData, allDriverHeaderData } from "../../data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import MasterdataTable from "../../components/table/master-data/MasterdataTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allAddressBookData, allDriverHeaderData } from "../../data/index2";

const MasterdataPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const datalist = allAddressBookData;
  const dataPerPage = 10;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = datalist.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(datalist.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Master Data"
            tableHeaderData={allDriverHeaderData}
          />

          <div className="panel-body">
            {/* <TableFilter2 showDatePicker showStatus /> */}
            {/* <TableFilter /> */}

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <MasterdataTable tableData={currentData} />
              </OverlayScrollbarsComponent>
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={datalist}
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
export default MasterdataPage;
