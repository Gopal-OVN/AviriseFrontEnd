import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchMenuPermissionAPI } from "../../services/menuPermission-service";
import TableHeader from "../../components/header/table-header/TableHeader";
import TableFilter from "../../components/filter/TableFilter";
import RolePermissionTable from "../../components/table/role-permission/rolePermissionTable";
import TableBottomControls from "../../components/utils/TableBottomControls";
import { allDriverHeaderData } from "../../data/index2";

const RolePermissionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const dataPerPage = 10;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const { data, refetch, isLoading, isError } = useQuery(
        "RolePermissions",
        async () => {
            try {
                const response = await fetchMenuPermissionAPI();
                return response;
            } catch (error: any) {
                toast.error(error.message || "Error fetching role permissions");
                return [];
            }
        }
    );

    if (isError) return <p>Error fetching role permissions.</p>;

    // Ensure `data` is an array
    const rolePermissions = data ?? [];

    // Filtering logic
    const filteredData = rolePermissions.filter((role) =>
        role.role_name?.toLowerCase().includes(searchTerm) ||
        role.permissions?.some((perm: any) => perm.permission_name.toLowerCase().includes(searchTerm)) ||
        role.menus?.some((menu: any) => menu.menu_name.toLowerCase().includes(searchTerm))
    );

    // Pagination logic
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="row g-4">
            <div className="col-12">
                <div className="panel">
                    <TableHeader
                        tableHeading="All Role Permissions"
                        tableHeaderData={allDriverHeaderData}
                        link="/create-role-permission"
                        showAddLink
                    />
                    <div className="panel-body">
                        {/* <TableFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} /> */}
                        <div className="table-responsive">
                            <OverlayScrollbarsComponent>
                                <RolePermissionTable tableData={currentData} refresh={refetch} isLoading={isLoading} />
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

export default RolePermissionPage;
