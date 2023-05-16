import api from "./api"; 
const baseURL = "https://boshaadmin.site";
export const authService = {
    login: async (data) => {
        return await api.post(baseURL+'/Authen/SignIn', data)
    },
    register: async (data) => {
        return await api.post(baseURL+'/Authen/SignUp', data)
    },
    forgetPass: async (data) => {
        return await api.get(baseURL+`/Authen/ForgetPass?gmail=${data}`)
    },
    renewPass: async (data) => {
        return await api.post(baseURL+'/Authen/RenewPassword', data)
    },
    registerGoogle: async (data) => {
        console.log(data)
        return await api.post(baseURL+'/Authen/SignUpGoogle', data)
    },
    loginGoogle: async (data) => {
        return await api.post(baseURL+'/Authen/SignInGoogle', data)
    },
}


