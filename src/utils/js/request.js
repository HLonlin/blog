/**
 * fetch.js
 * 请求再封装
 * @author fenghailin <1021944439@qq.com>
 */
import axios from 'axios' // http://www.axios-js.com/docs/vue-axios.html
import router from '../../router' // https://router.vuejs.org/zh/api/
import { ElMessage } from 'element-plus' // https://element.eleme.cn/#/zh-CN/component/installation

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60 * 60 * 1000 // 请求超时时间 1小时
})

// request拦截器  请求头设置token
service.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem('token')) {
      config.headers.authorization = window.sessionStorage.getItem('token') // 让请求携带token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器  状态拦截
service.interceptors.response.use(
  response => {
    if (response.data.code === '401') {
      ElMessage({
        type: 'error',
        message: '登录状态过期，请重新登录'
      })
      router.push({
        path: '/login',
        query: {
          redirect: location.hostname
        }
      })
    }

    if (response.data.code === '011') {
      ElMessage({
        type: 'error',
        message: '用户没有该项操作的权限'
      })
    }
    return response
  },
  error => {
    const str = error + ''
    if (str.search('timeout') !== -1) {
      // 超时error捕获
      ElMessage({
        type: 'error',
        message: '请求超时，请再次尝试'
      })
    }
    Promise.reject(error)
  }
)

export const getData = (url, type, data) => {
  if (type === 'get') {
    return service({
      url: url,
      method: type,
      params: data
    })
  } else {
    return service({
      url: url,
      method: type,
      data
    })
  }
}

export default service
