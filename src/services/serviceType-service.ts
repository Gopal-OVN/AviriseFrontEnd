

// import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchServiceTypeAPI = (): Promise<any> =>
  apiClients<any>('/service-type/', 'GET').then(response => response.service_types);


export const createServiceTypeAPI = (data:any): Promise<any> =>
  apiClients<any>('/service-type/', 'POST', data)




export const updateServiceTypeAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/service-type/${id}/`, 'PUT', data)



export const deleteServiceTypeAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/service-type/${id}/`, 'DELETE')

