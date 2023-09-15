import axios from 'axios'
import NProgress from 'nprogress'

const instance = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
})

// Loadbar
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
})

instance.interceptors.request.use(
  function (config) {
    NProgress.start()
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done()
    if (response && response.status === 200) {
      return response.data ? response.data : response
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
  },
  function (error) {
    NProgress.done()

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  }
)
export default instance
