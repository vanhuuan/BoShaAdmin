import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const commentService = {
    commentChapter: async (comment) => {
        return await api.post(`${baseURL}/Book/Comment`, comment)
    },
    getChapterComment: async (chapId, pageIndex = 0, pageSize = 10) => {
        return await api.get(`${baseURL}/Book/Comment?ChapterId=${chapId}&PageNumber=${pageIndex}&PageSize=${pageSize}`)
    },
    getUserChapterComment: async (chapId) => {
        return await api.get(`${baseURL}/Comment/GetUserComment?chapId=${chapId}`)
    },
    getReviewCommentBook: async (bookId, pageIndex = 0, pageSize = 10) => {
        return await api.get(`/Book/Review?BookId=${bookId}&PageNumber=${pageIndex}&PageSize=${pageSize}`)
    },
    getUserBookReview: async (bookId) => {
        return await api.get(`${baseURL}/Review/GetUserReview?bookId=${bookId}`)
    },
}
