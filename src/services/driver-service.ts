

import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchDriverAPI = (): Promise<any> =>
  apiClient<any>('/driver/', 'GET').then(response => response.drivers);


export const createDriverAPI = (data:any): Promise<any> =>
  apiClients<any>('/driver/', 'POST', data)




export const updateDriverAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/driver/${id}/`, 'PUT', data)



export const deleteDriverAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/driver/${id}/`, 'DELETE')

