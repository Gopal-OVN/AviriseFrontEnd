import { apiClients } from "../config/apiClients";


export const getOrderItemAPI = (): Promise<any> =>
    apiClients<any>('/order_item', 'GET').then(response => response.order_items);

export const createOrderItemAPI = (data: any): Promise<any> =>
    apiClients<any>('/order_item', 'POST', data)

export const updateOrderItemAPI = (order_item_id: any, data: any): Promise<any> =>
    apiClients<any>(`/order_item/${order_item_id}`, 'PUT', data)

export const deleteOrderItemAPI = (order_item_id: any): Promise<any> =>
    apiClients<any>(`/order_item/${order_item_id}`, 'DELETE')