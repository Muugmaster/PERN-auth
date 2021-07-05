import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getAccessToken } from '../utils/accessToken'

const API_URL = '/users'
const REFRESH_URL = '/users/refresh_token'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
})

const refreshAuthLogic = (failedRequest: any) => {
  return instance.post(REFRESH_URL).then((tokenRefreshResponse) => {
    localStorage.setItem('user', tokenRefreshResponse.data.accessToken)
    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + tokenRefreshResponse.data.accessToken
    return Promise.resolve()
  })
}

createAuthRefreshInterceptor(instance, refreshAuthLogic)

// instance.interceptors.request.use((request) => {
//   request.headers['Authorization'] = `Bearer ${getAccessToken()}`
//   return request
// })

const getAll = async () => {
  const response = await instance.get(`${API_URL}/all`)
  return response.data
}

const profile = async () => {
  const response = await instance.get(`${API_URL}/profile`)
  return response.data
}

export default { getAll, profile }
