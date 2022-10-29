import axiosApi from "./axios"
import Cookies from "js-cookie"

class AccountApi{
    login(params){
        const url = "/auth/login/"
        return axiosApi.post(url, params)
    }

    register(params){
        const url = "/auth/register/"
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
            response.data.accessToken
        );
        Cookies.set(
            "refresh",
            response.data.refreshToken
        );
    }

    save_info(response){
        Cookies.set("_id", response.data._id);
        Cookies.set("name", response.data.name);
        Cookies.set("phoneNumber", response.data.phoneNumber);
        Cookies.set("avatar", response.data.avatar);
        Cookies.set("isDeleted", response.data.isDeleted);
        Cookies.set("isAdmin", response.data.isAdmin);
        Cookies.set("createdAt", response.data.createdAt);
        Cookies.set("updatedAt", response.data.updatedAt);
        Cookies.set("__v", response.data.__v);
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

const getApi = (resource, extras) => {
    return {
        ...extras,
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

// const addMessageMedia = async () => {

// }

const api = {
    user: getApi("user", {
        get_info: (params) => {
            const url = `/user/`
            return axiosApi.get(url, params)
        }
    }),

    friend: getApi("friends", {
        invite: (user_id, params) => {
            const url = `/friends/invites/me/${user_id}`
            return axiosApi.post(url, params)
        },
        get_invites: (params) => {
            const url = `/friends/invites`
            return axiosApi.get(url, params)
        },
        accept: (sender_id, params) => {
            const url = `/friends/${sender_id}`
            return axiosApi.post(url, params)
        },
        decline: (sender_id, params) => {
            const url = `/friends/${sender_id}`
            return axiosApi.delete(url, params)
        }
    }),

    conversation: getApi("conversation", {
        create_1vs1: (params) => {
            const url = `/conversation`
            return axiosApi.post(url, params)
        },
        create_group: (params) => {
            const url = `/conversation/groups`
            return axiosApi.post(url, params)
        },
        get_last_view: (id, params) => {
            const url = `/conversation/${id}/last-view`
            return axiosApi.post(url, params)
        },
        leave_group: (id, params) => {
            const url = `/conversation/${id}/members/leave`
            return axiosApi.delete(url, params)
        }
    }),

    message: getApi("message", {
        addMessageText: (params) => {
            const url = `/message/text`
            return axiosApi.post(url, params)
        },
        addMessageMedia: (type, conversationId, params, onUploadProgress) => {
            const url = `/message/file/${type}/${conversationId}`
            return axiosApi.post(url, params, {
                onUploadProgress: onUploadProgress
            })
        },
        removeMessage: (message_id, params) => {
            const url = `/message/${message_id}`
            return axiosApi.delete(url, params)
        },
        deleteMessage: (message_id, params) => {
            const url = `/message/${message_id}/only`
            return axiosApi.delete(url, params)
        }
    })
}

export {AccountApi};
export default api;