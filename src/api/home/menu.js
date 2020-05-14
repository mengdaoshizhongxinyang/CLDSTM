import { axios } from "@/utils/request";
export function getContent() {
    return axios({
        url: '/static/test.md',
        method: 'get'
    })
}