import { axios } from "@/utils/request";
export function getDesktop() {
    return axios({
        url: '/desktop',
        method: 'get'
    })
}