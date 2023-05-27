import api from "./api"; 
const baseURL = "https://boshaadmin.site";
export const categoriseService = {
    updateCategory: async (data) => {
        return await api.put(`${baseURL}//Category/Update`, data)
    },
    deleteCategory: async (id) => {
        return await api.delete(`${baseURL}/Category/Delete?id=${id}`)
    },
    getPagingCategories: async (pageNumber, pageSize, queryString) => {
        return await api.get(`${baseURL}/Category/Paging?PageNumber=${pageNumber}&PageSize=${pageSize}QueryString=${queryString}`)
    },
    getCateory: async (id) => {
        return await api.get(`${baseURL}/Category?id=${id}`)
    },
    createCategory: async (data) => {
        return await api.post(`${baseURL}/Category/Create`, data)
    },
}