

import { apiClients } from "../config/apiClients";


export const fetchRoleAPI = (): Promise<any> =>
    apiClients<any>('/roles/', 'GET').then(response => response.roles);

export const createRoleAPI = (data: any): Promise<any> =>
    apiClients<any>('/roles/', 'POST', data)

export const updateRoleAPI = (role_id: any, data: any,): Promise<any> =>
    apiClients<any>(`/roles/${role_id}/`, 'PUT', data)

export const deleteRoleAPI = (role_id: any): Promise<any> =>
    apiClients<any>(`/roles/${role_id}/`, 'DELETE')
