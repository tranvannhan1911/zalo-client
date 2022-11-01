import Cookies from "js-cookie";

export const truncate = (str, num = 20) => {
  return str && str.length > num ? str.substr(0, num) + "..." : str;
};

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
  };
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const toTimeLastMessage = async (dateMess) => {
  const date = new Date(dateMess).getFullYear();
//   const nowTempt = new Date();
//   const DAY_MILISECONDS = 86400000;
//   const HOURSE_MILISECONDS = 3600000;
//   const MINUTE_MILISECONDS = 60000;
//   //  tính năm
//   if (nowTempt.getFullYear() - date.getFullYear() > 0)
//     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

//   const dateWasMinus7day = nowTempt.setDate(nowTempt.getDate() - 7);

//   if (date < dateWasMinus7day)
//     return `${date.getDate()}/${date.getMonth() + 1}`;

//   const now = new Date();
//   const numberMiliseconds = now - date;

//   // tính ngày
//   const day = Math.floor(numberMiliseconds / DAY_MILISECONDS);
//   if (day > 0) return `${day} ngày`;

//   // tính giờ
//   const hour = Math.floor(numberMiliseconds / HOURSE_MILISECONDS);
//   if (hour > 0) return `${hour} giờ`;

//   // tính phút
//   const minute = Math.floor(numberMiliseconds / MINUTE_MILISECONDS);
//   if (minute > 0) return `${minute} phút`;

  return date;
};
