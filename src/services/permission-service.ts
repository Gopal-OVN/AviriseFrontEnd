import { apiClients } from "../config/apiClients";


export const fetchPermissionAPI = (): Promise<any> =>
    apiClients<any>('/permission/', 'GET').then(response => response.permissions);