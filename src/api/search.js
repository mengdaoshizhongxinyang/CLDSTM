import { service } from "@/helper/axios"
export function Search(data) {
    return service({
        url: `/api/Search`,
        method: 'post',
        data: data
    })
}


export function SearchPersonal(id) {
    return service({
        url: `/api/Search/PersonInfo?PersonId=${id}`,
        method: 'get',
    })
}
