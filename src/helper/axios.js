import axios from 'axios'


let apiBaseUrl = '/'

if (process.env.NODE_ENV !== 'production') {
   apiBaseUrl = 'http://192.168.1.149:3036'
}
 
export const service = axios.create({
  baseURL: apiBaseUrl,
  timeout: 3000
})

const installer = {
  install(vueInstance, axiosService) {
    if (this.installed) return

    vueInstance.axios = axiosService

    Object.defineProperties(vueInstance.prototype, {
      $axios: {
        get: function get() {
          return axiosService
        }
      },
      $http: {
        get: function get() {
          return axiosService
        }
      }
    })
    this.installed = true
  }
}

export default installer