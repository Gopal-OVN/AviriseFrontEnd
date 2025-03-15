import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchAddressbookAPI } from "../../../services/addressbook-service";
import TableFilter from "../../filter/TableFilter";
import AddressbookTable2 from "../../table/address-book/AddressbookTable2";
import TableBottomControls from "../TableBottomControls";
type Props = {
  show: boolean;
  handleClose: () => void;
  onSelectAddress: (selected: any) => void; // New prop for handling selection
};

const AddressbookDropdown = ({ show, handleClose, onSelectAddress }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dataPerPage = 5;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const { data, refetch } = useQuery("AddressQuery", async () => {
    try {
      const response = await fetchAddressbookAPI();

      return response;
    } catch (error: any) {
      toast.error(error.message || "Error fetching service types");
    }
  });

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
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        onClick={handleClose}
      ></div>
      <div className={`delete-event-modal-container ${show ? "active" : ""}`}>
        <div className="row g-4">
          <div className="col-12">
            <div className="panel">
              <div className="panel-body">
                <TableFilter
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                />

                <div className="table-responsive">
                  <OverlayScrollbarsComponent>
                    <AddressbookTable2
                      tableData={currentData}
                      refresh={refetch}
                      onSelectAddress={onSelectAddress}
                      handleClose={handleClose}
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
      </div>
    </>
  );
};

export default AddressbookDropdown;
