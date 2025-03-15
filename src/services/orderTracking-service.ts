import { apiClients } from "../config/apiClients";


export const getOrderTrackingAPI = (): Promise<any> =>
    apiClients<any>('/order_tracking', 'GET').then(response => response.order_tracking);


export const createOrderTrackingAPI = (data: any): Promise<any> =>
    apiClients<any>('/order_tracking', 'POST', data)


export const updateOrderTrackingAPI = (order_tracking_id: any, data: any): Promise<any> =>
    apiClients<any>(`/order_tracking/${order_tracking_id}`, 'PUT', data)


export const deleteOrderTrackingAPI = (order_tracking_id: any): Promise<any> =>
    apiClients<any>(`/order_tracking/${order_tracking_id}`, 'DELETE')


