import { useEffect, useRef } from "react";
import { TableHeaderDataType } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleAddTaskModalOpen } from "../../../redux/features/addTaskModalSlice";
import { Link } from "react-router-dom";
type Props = {
  tableHeaderData: TableHeaderDataType[];
  tableHeading: string;
  buttonHeading?: string;
  showAddBtn?: boolean;
  showAddLink?: boolean;
  link?: string;
  showDownload?: string;
  showBranch?: boolean;
  showCompany?: boolean;

};
const TableHeader = ({
  tableHeaderData,
  buttonHeading,
  tableHeading,
  showAddBtn,
  showAddLink,
  showBranch,
  showCompany,
  showDownload,
  link,

}: Props) => {
  const dispatch = useAppDispatch();
  const openAddModal = () => {
    dispatch(toggleAddTaskModalOpen());
  };
  // Table Filter Header
  // const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const headerFilterRef = useRef<HTMLDivElement>(null);

  const permissions = localStorage.getItem("permissions") || "[]";  //permission authentication

  console.log("tableHeaderData", tableHeaderData);
  // const toggleFilterDropdown = () => {
  //   setFilterDropdown((prevState) => !prevState);
  // };

  const handleHeaderFilterClickOutside = (event: MouseEvent) => {
    if (
      headerFilterRef.current &&
      !headerFilterRef.current.contains(event.target as Node)
    ) {
      // setFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleHeaderFilterClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleHeaderFilterClickOutside);
    };
  }, []);

  console.log("showCompany:", showCompany);
  console.log("showBranch:", showBranch);

  return (
    <div className="panel-header">
      <h6>{tableHeading}</h6>

      <div className="btn-box d-flex gap-2">
        <div className="tableSearch" id="tableSearch"></div>

        {showCompany && permissions.includes("Create") && (
          <div className="btn-box">
            <Link className="btn  btn-sm btn-primary" to={"/add-company"}>
              <i className="fa-light fa-plus me-2 "></i>{" "}
              <span>Add Company</span>
            </Link>
          </div>
        )}

        {showBranch && permissions.includes("Create") && (
          <div className="btn-box">
            <Link className="btn  btn-sm btn-primary" to={"/add-branch"}>
              <i className="fa-light fa-plus me-2 "></i> <span>Add Branch</span>
            </Link>
          </div>
        )}
        {showAddBtn && permissions.includes("Create") && (
          <button
            className="btn btn-icon btn-sm btn-primary"
            onClick={openAddModal}
          >
            <i className="fa-light fa-plus"> </i>
          </button>
        )}
        {showAddLink && permissions.includes("Create") && (
          <div className="btn-box">
            <Link className="btn  btn-sm btn-primary" to={link || ""}>
              <i className="fa-light fa-plus me-2 "></i>{" "}
              <span>Add {buttonHeading}</span>
            </Link>
          </div>
        )}

        {showDownload && (
          <button className="btn btn-sm btn-primary">
            <i className="fa-light fa-download me-2"></i>
            <span>Download</span>
          </button>
        )}

        {/* <div className="btn-box">
          <Link className="btn  btn-sm btn-primary" to={link || ""}>
            <i className="fa-light fa-plus me-2 "></i>{" "}
            <span>Assign Delivery Agents</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};
export default TableHeader;
