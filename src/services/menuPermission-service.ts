import { apiClients } from "../config/apiClients";


export const fetchMenuPermissionAPI = (): Promise<any[]> =>
    apiClients<any>('/menu_permission_router/', 'GET').then(response => response.menu_permissions || []);