import { apiClients } from "../config/apiClients";


export const fetchRolePermissionAPI = (): Promise<any> =>
    apiClients<any>('/role_permission/', 'GET').then(response => response.role_permissions);


export const createRolePermissionAPI = (data: any): Promise<any> =>
    apiClients<any>('/role_permission/', 'POST', data)


export const updateRolePermissionAPI = (role_permission_id: any, data: any,): Promise<any> =>
    apiClients<any>(`/role_permission/${role_permission_id}/`, 'PUT', data)


export const deleteRolePermissionAPI = (role_permission_id: any): Promise<any> =>
    apiClients<any>(`/role_permission/${role_permission_id}/`, 'DELETE')
