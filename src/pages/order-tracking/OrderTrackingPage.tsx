import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { getOrderTrackingAPI } from "../../services/orderTracking-service";
import { FaCheckCircle, FaClipboardList, FaBoxOpen, FaTruckMoving, FaWalking, FaCheck } from "react-icons/fa";
import TableFilter from "../../components/filter/TableFilter";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import OrderTrackingTable from "../../components/table/order-tracking/OrderTrackingTable";
import TableBottomControls from "../../components/utils/TableBottomControls";

const OrderTrackingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const dataPerPage = 10;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const { data, refetch, isLoading, isError } = useQuery(
        "OrderTracking",
        async () => {
            try {
                const response = await getOrderTrackingAPI();
                return response;
            } catch (error: any) {
                toast.error(error.message || "Error fetching shipment status");
                return [];
            }
        }
    );

    if (isError) return <p className="text-danger">Error fetching shipment status.</p>;

    const filteredData = (data ?? []).filter(
        (item: any) =>
            (item.name?.toLowerCase() || "").includes(searchTerm) ||
            (item.description?.toLowerCase() || "").includes(searchTerm)
    );

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

    const totalPages = Math.ceil(filteredData.length / dataPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Define order tracking steps dynamically based on fetched data
    const steps = currentData.map((order: any, index: number) => ({
        name: order.status,
        icon: index === 0 ? FaClipboardList
            : index === 1 ? FaBoxOpen
                : index === 2 ? FaTruckMoving
                    : index === 3 ? FaWalking
                        : FaCheck,
        completed: order.completed,
    }));

    return (
        <div className="row g-4">
            <div className="col-12">
                <div className="panel p-4">
                    <h4 className=" text-dark">FOLLOW YOUR ORDER</h4>
                    <div className="panel-body">
                        <TableFilter
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                        />
                    </div>

                    <div className="table-responsive">
                        <OverlayScrollbarsComponent>
                            <OrderTrackingTable tableData={currentData} refresh={refetch} isLoading={isLoading} />
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

                    {/* Order Steps */}
                    {/* <div className="position-relative">
                    <div className="position-absolute top-0 start-3 w-2 bg-secondary h-100" style={{ left: "20px", width: "4px" }}></div>
                    {steps.map((step: any, index: any) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                            <div className="position-relative">
                                {step.completed ? (
                                    <FaCheckCircle className="text-success fs-3" />
                                ) : (
                                    <div className="rounded-circle border border-secondary p-2"></div>
                                )}
                            </div>
                            <div className="d-flex align-items-center ms-3">
                                <step.icon className={`me-2 ${step.completed ? "text-success" : "text-secondary"}`} size={20} />
                                <span className={`fs-5 ${step.completed ? "text-success" : "text-secondary"}`}>{step.name}</span>
                            </div>
                        </div>
                    ))}
                </div> */}

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                    <nav className="mt-3">
                        <ul className="pagination justify-content-center">
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(number)}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )} */}
                </div>
            </div>
        </div>
    );
};


export default OrderTrackingPage;