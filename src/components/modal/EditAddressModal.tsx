import { useState } from "react";
import { toggleEditAddressModalClose } from "../../redux/features/editAddressModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useQuery } from "react-query";
import { fetchAddressbookAPI } from "../../services/addressbook-service";
import { toast } from "react-toastify";
import TableBottomControls from "../utils/TableBottomControls";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import AddressbookTable2 from "../table/address-book/AddressbookTable2";
import TableFilter from "../filter/TableFilter";
import { useAtom } from "jotai";
import { senderAddressAtom } from "../../redux/jotaiStore/addressbookAtom";
import { reciverAddressAtom } from "../../redux/jotaiStore/reciverAddressAtom";

const EditAddressModal = () => {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector(
    (state) => state.editAddressModal.isModalOpen
  );
  const closeModal = () => {
    dispatch(toggleEditAddressModalClose());
  };
  const modalType = useAppSelector((state) => state.editAddressModal.type);

  const [, setSenderAddress] = useAtom(senderAddressAtom); // Use Jotai atom
  const [, setReciverAddress] = useAtom(reciverAddressAtom); // Use Jotai atom

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

  const onSelectAddress = (address: any) => {
    if (modalType == "sender") {
      setSenderAddress(address);
    } else {
      setReciverAddress(address);
    }
  };

  return (
    <>
      <div
        className={`ar-modal-overlay ${modalOpen ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`edit-task-modal-container ar-modal ${
          modalOpen ? "active" : ""
        }`}
      >
        <div className="ar-modal-content">
          <div className="edit-task-modal-header">
            <h2>Select Address</h2>
            <button
              className="btn btn-sm btn-icon btn-outline-primary"
              onClick={closeModal}
            >
              <i className="fa-light fa-times"></i>
            </button>
          </div>
          <div className="edit-task-modal-body">
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
                          handleClose={closeModal}
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
        </div>
      </div>
    </>
  );
};
export default EditAddressModal;
