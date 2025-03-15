import { apiClients } from "../config/apiClients";


export const getVehicleAPI = (): Promise<any> =>
    apiClients<any>('/vehicle', 'GET').then(response => response.vehicles);

export const createVehicleAPI = (data: any): Promise<any> =>
    apiClients<any>('/vehicle', 'POST', data)

export const updateVehicleAPI = (id: any, data: any): Promise<any> =>
    apiClients<any>(`/vehicle/${id}`, 'PUT', data)

export const deleteVehicleAPI = (id: any): Promise<any> =>
    apiClients<any>(`/vehicle/${id}`, 'DELETE')