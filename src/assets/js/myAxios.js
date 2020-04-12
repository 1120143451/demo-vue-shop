import axios from 'axios'

let myAxios = {}

myAxios.install = function (Vue) {
  Vue.prototype.$myHttp = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  })
}

export default myAxios
