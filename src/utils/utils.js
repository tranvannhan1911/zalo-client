import Cookies from "js-cookie"

export const truncate = (str, num=20) => {
    return str && str.length > num ? str.substr(0, num)+"...": str
}

export const get_info_from_cookie = () => {
    return {
        _id: Cookies.get("_id"),
        name: Cookies.get("name"),
        phoneNumber: Cookies.get("phoneNumber"),
        avatar: Cookies.get("avatar"),
        isDeleted: Cookies.get("isDeleted"),
        isAdmin: Cookies.get("isAdmin"),
        createdAt: Cookies.get("createdAt"),
        updatedAt: Cookies.get("updatedAt"),
        __v: Cookies.get("__v"),
    }
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });