import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const getOrderAPI = (
    shipment_status_name?: any,
): Promise<any> => {

    const params = {
        ...(shipment_status_name && { shipment_status_name: shipment_status_name }),
    };
    // Construct the query string with URLSearchParams
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return apiClients<any>(`/orders/${queryString ? `?${queryString}` : ''}`, 'GET').then(response => response.orders);


}
export const createOrderAPI = (data: any): Promise<any> =>
    apiClients<any>('/orders', 'POST', data)

export const updateOrderAPI = (id: any, data: any): Promise<any> =>
    apiClients<any>(`/orders/${id}`, 'PUT', data)

export const deleteOrderAPI = (id: any): Promise<any> =>
    apiClients<any>(`/orders/${id}`, 'DELETE')



export const assignDriverAPI = (data: any): Promise<any> =>
    apiClients<any>(`/orders/assign-driver`, 'PUT', data)


export const updateOrderShipmentStatusAPI = (order_id: any, data: any): Promise<any> =>
    apiClients<any>(`/orders/${order_id}/update-shipment-status`, 'PUT', data)

export const uploadPODAPI = (order_id: any, data: any): Promise<any> =>
    apiClient<any>(`/orders/upload-pod/${order_id}`, 'POST', data)