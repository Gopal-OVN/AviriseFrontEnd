import { useEffect, useRef, useState } from "react";
import DotIcon from "../../../styles/img/dot-icon";

type ActionDropdownProps = {
  shipmentId: string;
};

const ActionDropdown = ({ shipmentId }: ActionDropdownProps) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setActiveDropdownId(activeDropdownId === shipmentId ? null : shipmentId);
  };

  return (
    <div className="dropdown  dropstart" ref={dropdownRef}>
      <button
        className={`btn  ${activeDropdownId === shipmentId ? "show" : ""}`}
        onClick={toggleDropdown}
      >
        <DotIcon className="text-gray-500" />
      </button>
      <div
        className={`dropdown-menu  ${activeDropdownId === shipmentId ? "show" : ""
          }`}
      >
        <button className="dropdown-item  d-flex align-items-center gap-2">
          <i className="fa-light fa-eye"></i>
          View
        </button>
        <button className="dropdown-item d-flex align-items-center gap-2">
          <i className="fa-light fa-pen"></i>
          Update
        </button>
        <button className="dropdown-item d-flex align-items-center gap-2">
          <i className="fa-light fa-trash"></i>
          Delete
        </button>
      </div>
    </div>
  );
};
export default ActionDropdown;
