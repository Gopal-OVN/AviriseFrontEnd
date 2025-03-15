
import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


// export const fetchCompaniesAPI = (): Promise<any> =>
//   apiClient<any>('/companies/', 'GET').then(response => response.companies);


export const fetchCompaniesAPI = (
  page?: number,
  pageSize?: number,
  name?: string,
  email?: string,
  roleId?: number,
  companyId?: number,
  branchId?: number
): Promise<any> => {
  const params = {
    ...(page !== undefined && { page }),
    ...(pageSize !== undefined && { page_size: pageSize }),
    ...(name && { search: name }),
    ...(email && { email }),
    ...(roleId && { role_id: roleId }),
    ...(companyId && { company_id: companyId }),
    ...(branchId && { branch_id: branchId }),
  };

  // Construct query string using URLSearchParams
  const queryString = new URLSearchParams(params as Record<string, string>).toString();

  return apiClient<any>(`/companies/${queryString ? `?${queryString}` : ''}`, 'GET');
};



export const createCompanyAPI = (data:any): Promise<any> =>
  apiClients<any>('/companies/', 'POST', data)


export const updateCompanyAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/companies/${id}/`, 'PUT', data)



export const deleteCompanyAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/companies/${id}/`, 'DELETE')

// export const createApprovedUsersAPI = ( data: any) =>
//   apiRequest<any>(`/superusers/`, 'POST', data); 


export const fetchIndustryAPI = (): Promise<any> =>
  apiClient<any>('/industry-type/', 'GET')

export const fetchGlobalStatueAPI = (): Promise<any> =>
  apiClient<any>('/globle-status/', 'GET')

