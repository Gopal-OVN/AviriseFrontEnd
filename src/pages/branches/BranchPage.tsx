import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableFilter2 from "../../components/filter/TableFilter2";
import TableHeader from "../../components/header/table-header/TableHeader";
import BranchTable from "../../components/table/branches/BranchTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import {
  deleteBranchAPI,
  fetchBranchesAPI,
} from "../../services/branch-service";

const BranchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchBranchesAPI();
        setDataList(response);
      } catch (error: any) {
        toast.error(error || "Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  console.log("dataList", dataList);
  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Delete function
  const handleDelete = async (id: any) => {
    // const updatedDataList = dataList.filter((item: any) => item?.id !== id);
    // setDataList(updatedDataList);

    try {
      const result = await deleteBranchAPI(id);
      toast.success(result.message || "Delete successful");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Brances"
            buttonHeading="Branch"
            tableHeaderData={dataList}
            link="/add-branch"
            showAddLink
          />

          <div className="panel-body">
            {/* <div className="product-table-quantity">
              <ul>
                <li className="text-white">All (23)</li>
                <li>Published (19)</li>
                <li>Draft (05)</li>
                <li>Trush (05)</li>
              </ul>
            </div> */}

            <TableFilter2 showCategory showProductType showProductStock />

            <div className="table-responsive">
              <BranchTable
                tableData={currentData}
                handleDelete={handleDelete}
              />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={dataList}
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
export default BranchPage;
