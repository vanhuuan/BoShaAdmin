import api from "./api";
const baseUrl = "https://boshaadmin.site";
export const adminServices = {
    getAdminPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(
            `${baseUrl}/GetPagingAdmin?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`
            )
        },
    makeAdmin: async (adminEmail) => {
        return await api.put(
            `${baseUrl}/MakeAdmin?userEmail=${adminEmail}`
        )
    },
    removeAdmin: async (adminId) => {
        return await api.delete(
            `${baseUrl}/RemoveAdmin?userId=${adminId}`
        )
    },
}