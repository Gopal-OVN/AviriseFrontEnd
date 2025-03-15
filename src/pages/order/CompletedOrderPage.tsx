// import { useState } from "react";
// import TableHeader from "../../components/header/table-header/TableHeader";
// // import { allAddressBookData, allDriverHeaderData } from "../../data";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import TableFilter from "../../components/filter/TableFilter";
// import OrderTable from "../../components/table/order/OrderTable";
// import TableBottomControls from "../../components/utils/TableBottomControls";
// import { ShipmentData, allDriverHeaderData } from "../../data/index2";

// const CompletedOrderPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const datalist = ShipmentData;
//   const dataPerPage = 10;
//   const paginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastData = currentPage * dataPerPage;
//   const indexOfFirstData = indexOfLastData - dataPerPage;
//   const currentData = datalist.slice(indexOfFirstData, indexOfLastData);

//   const totalPages = Math.ceil(datalist.length / dataPerPage);
//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );
//   return (
//     <div className="row g-4">
//       <div className="col-12">
//         <div className="panel">
//           <TableHeader
//             tableHeading="Completed Shipment"
//             tableHeaderData={allDriverHeaderData}
//             link="/create-shipment"
//             showAddLink
//           />

//           <div className="panel-body">
//             <TableFilter />

//             <div className="table-responsive">
//               <OverlayScrollbarsComponent>
//                 {/* <OrderTable tableData={currentData} /> */}
//               </OverlayScrollbarsComponent>
//             </div>

//             <TableBottomControls
//               indexOfFirstData={indexOfFirstData}
//               indexOfLastData={indexOfLastData}
//               dataList={datalist}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//               pageNumbers={pageNumbers}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CompletedOrderPage;
