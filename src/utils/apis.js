import axiosApi from "./axios"
import Cookies from "js-cookie"

class AccountApi{
    login(params){
        const url = "/auth/login/"
        return axiosApi.post(url, params)
    }

    forgot_password(params){
        const url = "/auth/forgot_password/"
        return axiosApi.post(url, params)
    }

    forgot_password_verify(params){
        const url = "/auth/forgot_password/verify/"
        return axiosApi.post(url, params)
    }

    change_password(params){
        const url = "/auth/change_password/"
        return axiosApi.post(url, params)
    }

    get_info(params){
        const url = "/auth/get_info/"
        return axiosApi.get(url, params)
    }

    save_token(response){
        Cookies.set(
            "access",
            response.data.data.access
        );
        Cookies.set(
            "refresh",
            response.data.data.refresh
        );
    }

    remove_token(response){
        Cookies.remove("access")
        Cookies.remove("refresh")
    }

    get_token(){
        return {
            access: Cookies.get("access"),
            refresh: Cookies.get("refresh"),
        }
    }
}

const getApi = (resource) => {
    return {
        list: (params) => {
            const url = `/${resource}/`
            return axiosApi.get(url, params)
        },
        get: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.get(url, params)
        },
        add: (params) => {
            const url = `/${resource}/`
            return axiosApi.post(url, params)
        },
        update: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.put(url, params)
        },
        delete: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.delete(url, params)
        }
    }
}

const api = {
    customer: getApi("customer"),
}

export {AccountApi};
export default api;