import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const userBookService = {
    categories: async () => {
        return await api.get(baseURL+'/categories')
    },
    bookDetail: async (id) => {
        return await api.get(`${baseURL}/Book?id=${id}`)
    },
}


