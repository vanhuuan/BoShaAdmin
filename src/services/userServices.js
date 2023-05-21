import api from "./api"; 
const baseURL = "https://boshaadmin.site";
export const userService = {
    updateUserInfo: async (data) => {
        return await api.put(`${baseURL}/UpdateInfo`, data)
    },
    getUserInfoById: async (id) => {
        return await api.get(`${baseURL}/GetUserByID?id=${id}`)
    },
    getUserPaging: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(
            `${baseURL}/GetPagingUser?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`
        )
    },
    changeUserState: async (uid) => {
        return await api.put(
            `${baseURL}/ChangeUserStatus?id=${uid}`, null
        )
    },
    deleteUsser: async (uid) => {
        return await api.delete(
            `${baseURL}/DeleteUser?id=${uid}`
        )
    },
}
