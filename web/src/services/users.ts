import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getAccessToken } from '../utils/accessToken'

const API_URL = 'http://localhost:4000/api/v1/users'
const REFRESH_URL = 'http://localhost:4000/api/v1/users/refresh_token'

const instance = axios.create({
  baseURL: REFRESH_URL,
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

createAuthRefreshInterceptor(axios, refreshAuthLogic, {
  statusCodes: [401, 403],
})

axios.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${getAccessToken()}`
  return request
})

const getAll = async () => {
  const response = await axios.get(`${API_URL}/all`)
  return response.data
}

const profile = async () => {
  const response = await axios.get(`${API_URL}/profile`)
  return response.data
}

export default { getAll, profile }
