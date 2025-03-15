
import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


// export const fetchUsersAPI = (): Promise<any> =>
//   apiClient<any>('/users/users/', 'GET').then(response => response.users);


export const fetchUsersAPI = (
  page?: number,
  pageSize?: number,
  name?: string,
  email?: string,
  roleId?: number,
  role_name?:any,
  companyId?: number,
  branchId?: number
): Promise<any> => {
  const params= {

    ...(page !== undefined && { page }),
    ...(pageSize !== undefined && { page_size: pageSize }),
    ...(name && { first_name: name }),
    ...(email && { email }),
    ...(roleId && { role_id: roleId }),
    ...(role_name && { role_name: role_name }),
    ...(companyId && { company_id: companyId }),
    ...(branchId && { branch_id: branchId }),
  };
  // Construct the query string with URLSearchParams
  const queryString = new URLSearchParams(params as Record<string, string>).toString();

  return apiClient<any>(`/users/users/${queryString ? `?${queryString}` : ''}`, 'GET');

};

export const createUserAPI = (data:any): Promise<any> =>
  apiClients<any>('/users/', 'POST', data)


export const updateUserAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/users/update-user/${id}/`, 'PUT', data)



export const deleteUserAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/users/delete-user/${id}/`, 'DELETE')




export const fetchCountryAPI = (): Promise<any> =>
  apiClient<any>('/countries/', 'GET').then(response => response.countries);

// export const createApprovedUsersAPI = ( data: any) =>
//   apiRequest<any>(`/superusers/`, 'POST', data); 


export const fetchProfileAPI = (): Promise<any> =>
  apiClient<any>('/users/profile/', 'GET');


export const updateProfileAPI = ( data:any,): Promise<any> =>
  apiClients<any>(`/update/profile/`, 'PUT', data)