import axios from 'axios'
import qs from 'qs'
import authRefreshInterceptor from 'axios-auth-refresh'
import { setToken, getToken, removeToken } from '@utils/auth'
import { firebaseAuth } from 'src/boot/firebase'
import { isMobileApp } from 'src/utils/common'

const baseURL = `${process.env.BLOOPRINTED_ENV_API_URL}/v1`

const contentType = {
  json: 'application/json',
  form: 'multipart/form-data',
  vdn: 'application/vnd.api+json'
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: contentType.vdn,
    'Content-Type': contentType.vdn
  },
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  transformResponse: [
    apiResponse => {
      if (apiResponse) {
        const { data, meta, links } = JSON.parse(apiResponse)
        const { errors } = JSON.parse(apiResponse)
        if (data) {
          if (meta || links) {
            return { data, meta, links }
          }
          return data
        }
        if (errors) {
          return errors[0]
        }
      }
      return apiResponse
    }
  ]
})

axiosInstance.interceptors.request.use(config => {
  const token = getToken('access')
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

const refreshToken = failedRequest => {
  const user = firebaseAuth.currentUser
  if (user) {
    return user
      .getIdToken(true)
      .then(token => {
        setToken(token)
        failedRequest.response.config.headers['Authorization'] = token
        return Promise.resolve()
      })
      .catch(error => {
        if (error) throw error
        return Promise.reject()
      })
  } else {
    removeToken()
    if (isMobileApp()) {
      window.location = '/signin?timeout=true'
    } else {
      window.location = '/login?timeout=true'
    }
  }
}

authRefreshInterceptor(axiosInstance, refreshToken)

export const formRequest = {
  post: (url, data) =>
    axiosInstance.post(url, data, { 'Content-Type': contentType.form }),
  put: (url, data) =>
    axiosInstance.put(url, data, { 'Content-Type': contentType.form })
}

const request = {
  get: (url, params) => axiosInstance.get(url, { params }),
  post: (url, body) => axiosInstance.post(url, body),
  put: (url, body) => axiosInstance.put(url, body),
  patch: (url, body) => axiosInstance.patch(url, body),
  delete: url => axiosInstance.delete(url),
  delWithData: (url, data) => axiosInstance.delete(url, { data })
}

export default request
