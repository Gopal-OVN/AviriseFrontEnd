


import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchBranchesAPI = (): Promise<any> =>
  apiClient<any>('/branches/', 'GET')



export const createBranchAPI = (data:any): Promise<any> =>
  apiClients<any>('/branches/', 'POST', data)


export const updateBranchAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/branches/${id}/`, 'PUT', data)



export const deleteBranchAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/branches/${id}/`, 'DELETE')

// export const createApprovedUsersAPI = ( data: any) =>
//   apiRequest<any>(`/superusers/`, 'POST', data); 