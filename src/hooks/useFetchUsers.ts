import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchUsersAPI } from "../services/user-service";
import { FilterDataType } from "../types/company-dataType";

const useFetchUsers = (role_name?:any) => {
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

  const { data, refetch , isLoading} = useQuery(
    ["users", filters, currentPage, pageamount, role_name],
    async () => {
      try {
        const response = await fetchUsersAPI(
          currentPage,
          pageamount,
          filters.name,
          filters.email,
          filters.roleId,
		  role_name
        );
        setTotal(response.total);
        setDataPerPage(response.page_size);
        setPageNumber(response.page);

        return response.users;
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

export default useFetchUsers;
