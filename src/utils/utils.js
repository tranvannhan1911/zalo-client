export const truncate = (str, num=20) => {
    return str.length > num ? str.substr(0, num)+"...": str
}