import axios from 'axios';
import Qs from 'qs';
import notification from 'ant-design-vue/es/notification'
const service = axios.create({
    // baseURL: process.env.BASE_URL,
    timeout: 30000, // 请求超时时间
    baseURL: process.env.VUE_APP_API_BASE_URL,
})
const err = (error) => {
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
        }
    }
    return Promise.reject(error)
}
service.interceptors.request.use(config => {
    return config
}, err)

service.interceptors.response.use((response) => {
    return response.data
}, err)

export {
    service as axios
}

