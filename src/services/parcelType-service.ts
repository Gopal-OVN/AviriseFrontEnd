import { apiClients } from "../config/apiClients";



export const getParcelTypeAPI = (): Promise<any> =>
    apiClients<any>('/parcel_types', 'GET').then(response => response.parcel_types);


export const createParcelTypeAPI = (data:any): Promise<any> =>
    apiClients<any>('/parcel_types', 'POST', data)


export const updateParcelTypeAPI = (id:any, data:any): Promise<any> =>
    apiClients<any>(`/parcel_types/${id}`, 'PUT', data) 


export const deleteParcelTypeAPI = (id:any): Promise<any> =>
    apiClients<any>(`/parcel_types/${id}`,'DELETE')