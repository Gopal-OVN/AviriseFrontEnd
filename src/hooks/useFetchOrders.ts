import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
// import { fetchUsersAPI } from "../services/user-service";
import { FilterDataType } from "../types/company-dataType";
import { getOrderAPI } from "../services/order-service";

const useFetchOrders = (shipment_status_name?: any) => {
  const [filters, setFilters] = useState<FilterDataType>({
    name: "",
    email: "",
    roleId: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2);
  const [total, setTotal] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageamount, setPageamount] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ["OrdersQuery", filters, currentPage, pageamount, shipment_status_name],
    async () => {
      try {
        const response = await getOrderAPI(
          // currentPage,
          // pageamount,
          // filters.name,
          // filters.email,
          // filters.roleId,
          // role_name
          shipment_status_name
        );
        setTotal(response.total);
        setDataPerPage(response.page_size);
        setPageNumber(response.page);
        console.log("responseeeeeeeee", response)

        return response;
      } catch (error: any) {
        toast.error(error || "Error fetching users");
        throw error;
      }
    }
  );

  return {
    data,
    refetch,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    dataPerPage,
    total,
    pageNumber,
    pageamount,
    setPageamount,
    isLoading
  };
};

export default useFetchOrders;
