import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const userService = {
    updateUserInfo: async (data) => {
        return await api.put(`${baseURL}/UpdateInfo`, data)
    },
    getUserInfo: async () => {
        return await api.get(`${baseURL}/GetUserInfo`)
    }
}
