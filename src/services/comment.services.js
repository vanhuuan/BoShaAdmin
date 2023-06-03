import api from "./api"; 
const baseURL = "https://boshaapi.site";
const baseAdminURL = "https://boshaadmin.site";
export const commentService = {
    commentChapter: async (comment) => {
        return await api.post(`${baseURL}/Book/Comment`, comment)
    },
    getChapterComment: async (chapId, pageIndex = 0, pageSize = 10) => {
        return await api.get(`${baseURL}/Book/Comment?ChapterId=${chapId}&PageNumber=${pageIndex}&PageSize=${pageSize}`)
    },
    getReviewCommentBook: async (bookId, pageIndex = 0, pageSize = 10) => {
        return await api.get(`${baseURL}/Book/Review?BookId=${bookId}&PageNumber=${pageIndex}&PageSize=${pageSize}`)
    },
    deleteReview: async (id) => {
        return await api.delete(`${baseAdminURL}/Book/Review/Delete?id=${id}`)
    },
    deleteComment: async (id) => {
        return await api.delete(`${baseAdminURL}/Book/Comment/Delete?id=${id}`)
    }
}
