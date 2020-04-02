import axios from 'axios'

var myAxios = {}

myAxios.install = function (Vue) {
  Vue.prototype.$myHttp = axios
}

export default myAxios
