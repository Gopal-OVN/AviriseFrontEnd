import { apiClients } from "../config/apiClients";


export const getShipmentStatusAPI = (): Promise<any> =>
    apiClients<any>('/shipment_status', 'GET').then(response => response.shipment_status);


export const createShipmentStatusAPI = (data: any): Promise<any> =>
    apiClients<any>('/shipment_status', 'POST', data)


export const updateShipmentStatusAPI = (shipment_status_id: any, data: any): Promise<any> =>
    apiClients<any>(`/shipment_status/${shipment_status_id}`, 'PUT', data)


export const deleteShipmentStatusAPI = (shipment_status_id: any): Promise<any> =>
    apiClients<any>(`/shipment_status/${shipment_status_id}`, 'DELETE')


