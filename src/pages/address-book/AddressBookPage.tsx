import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import TableFilter from "../../components/filter/TableFilter";
import TableHeader from "../../components/header/table-header/TableHeader";
import AddressBookTable from "../../components/table/address-book/AddressBookTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData } from "../../data/index2";
import { fetchAddressbookAPI } from "../../services/addressbook-service";

const AddressBookPage = () => {
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
      toast.error(error.message || "Error fetching addressbook");
    }
  });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error fetching service types.</p>;

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
            tableHeading="All Address"
            tableHeaderData={allDriverHeaderData}
            link="/create-address"
            showAddLink
          />

          <div className="panel-body">
            <TableFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <AddressBookTable tableData={currentData} refresh={refetch} />
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

export default AddressBookPage;
