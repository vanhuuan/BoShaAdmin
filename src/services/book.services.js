import api from "./api";
const baseURL = "https://boshaapi.site";
const baseAdminURL = "https://boshaadmin.site";
export const bookService = {
    bookDetail: async (id) => {
        return await api.get(`${baseURL}/Book?id=${id}`)
    },
    findBook: async (pageNumber, pageSize, name, categories, state, min, max, sort, sortType) => {
        var textCate = "?Categories="
        if (categories && categories.length > 0) {
            categories.forEach(element => {
                textCate = textCate.concat("&Categories=" + element)
            });
        }

        const url = `${baseURL}/Books${textCate}&Name=${name}&State=${state}&NotState=Susspend&MinPrice=${min}&MaxPrice=${max}&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=fgsdgsdfgdfg&QueryString=sdfgsdfgdfg&SortBy=${sort}&SortType=${sortType}`
        console.log(url)
        return await api.get(url)
    },
    blockBook: async (id, reason) => {
        return await api.get(`${baseAdminURL}/Book/BlockBook?id=${id}&reason=${reason}`)
    },
}


